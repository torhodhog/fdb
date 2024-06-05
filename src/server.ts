import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import express from "express";
import { Request } from 'express';
import { IncomingMessage } from "http";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from 'payload/types';
import { parse } from "url";

import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import { stripeWebhookHandler } from './webhooks';

interface MyRequest extends Request {
  payload: PayloadRequest['payload'];
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebhookRequest = IncomingMessage & {
  rawBody: Buffer;
};

const start = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post(
    "/api/webhooks/stripe",
    webhookMiddleware,
    async (req: express.Request, res: express.Response) => {
      console.log("Received Stripe webhook event");
      await stripeWebhookHandler(req, res);
    }
  );

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");

      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });

    return;
  }

  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect("/sign-in?origin=cart");

    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;

    return nextApp.render(req, res, "/cart", query);
  });

  app.use("/cart", cartRouter);

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get('/api/products', async (req: Request, res) => {
    const myReq = req as MyRequest;

    const searchTerm = (myReq.query as any).searchTerm;
    const ligaSystem = (myReq.query as any).liga_system;
    const onSale = (myReq.query as any).onSale;
    const page = parseInt((myReq.query as any).page) || 1;
    const limit = parseInt((myReq.query as any).limit) || 20;

    console.log('searchTerm:', searchTerm);
    console.log('ligaSystem:', ligaSystem);
    console.log('onSale:', onSale);
    console.log('page:', page);
    console.log('limit:', limit);

    let query: Record<string, any> = {};
    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, 'i') };
    }
    if (ligaSystem) {
      query.liga_system = ligaSystem;
    }
    if (onSale) {
      query.onSale = onSale === 'true'; // Convert the string 'true' or 'false' to a boolean
    }

    console.log('query:', query);

    try {
      const totalItemsResult = await myReq.payload.find({
        collection: 'products',
        where: query,
        limit: 0, // Ensures we only get the count
      });

      console.log('totalItemsResult:', totalItemsResult);

      const totalItems = totalItemsResult.totalDocs || 0;
      console.log('totalItems:', totalItems);

      const { docs: products } = await myReq.payload.find({
        collection: 'products',
        where: query,
        limit,
        page,
      });

      console.log('products:', products);

      res.json({ items: products, totalItems });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
