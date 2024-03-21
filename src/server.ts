import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import express from "express";
import { IncomingMessage } from "http";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import { stripeWebhookHandler } from './webhooks'
import  {Products} from './collections/Products/Products'

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
    stripeWebhookHandler
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

  // ...andre ruter...

  // app.get('/api/products', async (req, res) => {
  //   const searchTerm = (req.query as any).searchTerm;
  //   const ligaSystem = (req.query as any).liga_system;

  //   let query: Record<string, any> = {};
  //   if (searchTerm) {
  //     query.name = { $regex: new RegExp(searchTerm, 'i') };
  //   }
  //   if (ligaSystem) {
  //     query.liga_system = ligaSystem;
  //   }

  //   const { docs: products } = await req.payload.find({
  //     collection: 'products',
  //     where: query,
  //   });

  //   res.json(products);
  // });

  app.use((req, res) => nextHandler(req, res));

  // ...resten av koden...

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