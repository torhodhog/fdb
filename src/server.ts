import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import express from "express";
import { Request } from "express";
import { IncomingMessage } from "http";
import nextBuild from "next/dist/build";
import path from "path";

import type { PayloadRequest } from "payload/types";

import { parse } from "url";

import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import { stripeWebhookHandler } from "./webhooks";

interface MyRequest extends Request {
  payload: PayloadRequest["payload"];
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

// 👇 Dette må ligge før noe annet middleware
app.post(
  "/api/webhooks/stripe",
  bodyParser.raw({ type: "application/json" }), 
  stripeWebhookHandler 
);


const start = async () => {
  
  app.use(bodyParser.json());

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cmsInstance: any) => {
        cmsInstance.logger.info(
          `Payload Admin URL: ${cmsInstance.getAdminURL()}`
        );
      },
    },
  });

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");
      await nextBuild(
        path.join(__dirname, "../"),
        false,
        false,
        true,
        false,
        false,
        undefined,
        "default"
      );
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
    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  console.log(
    "Available TRPC routes:",
    Object.keys(appRouter._def.procedures)
  );

  app.get("/api/products", async (req: Request, res) => {
    const myReq = req as MyRequest;
    const searchTerm = (myReq.query as any).searchTerm;
    const ligaSystem = (myReq.query as any).liga_system;
    const onSale = (myReq.query as any).onSale;
    const page = parseInt((myReq.query as any).page) || 1;
    const limit = parseInt((myReq.query as any).limit) || 20;

    let query: Record<string, any> = {};
    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, "i") };
    }
    if (ligaSystem) {
      query.liga_system = ligaSystem;
    }
    if (onSale) {
      query.onSale = onSale === "true";
    }

    try {
      const totalItemsResult = await myReq.payload.find({
        collection: "products",
        where: query,
        limit: 0,
      });

      const totalItems = totalItemsResult.totalDocs || 0;

      const { docs: products } = await myReq.payload.find({
        collection: "products",
        where: query,
        limit,
        page,
      });

      res.json({ items: products, totalItems });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");
    app.listen(PORT, () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
