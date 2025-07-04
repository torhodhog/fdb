"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const build_1 = __importDefault(require("next/dist/build"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const get_payload_1 = require("./get-payload");
const next_utils_1 = require("./next-utils");
const trpc_1 = require("./trpc");
const webhooks_1 = require("./webhooks");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const createContext = ({ req, res, }) => ({
    req,
    res,
});
// 👇 Dette må ligge før noe annet middleware
app.post("/api/webhooks/stripe", body_parser_1.default.raw({ type: "application/json" }), webhooks_1.stripeWebhookHandler);
const start = async () => {
    app.use(body_parser_1.default.json());
    const payload = await (0, get_payload_1.getPayloadClient)({
        initOptions: {
            express: app,
            onInit: async (cmsInstance) => {
                cmsInstance.logger.info(`Payload Admin URL: ${cmsInstance.getAdminURL()}`);
            },
        },
    });
    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async () => {
            payload.logger.info("Next.js is building for production");
            await (0, build_1.default)(path_1.default.join(__dirname, "../"), false, false, true, false, false, undefined, "default");
            process.exit();
        });
        return;
    }
    const cartRouter = express_1.default.Router();
    cartRouter.use(payload.authenticate);
    cartRouter.get("/", (req, res) => {
        const request = req;
        if (!request.user)
            return res.redirect("/sign-in?origin=cart");
        const parsedUrl = (0, url_1.parse)(req.url, true);
        return next_utils_1.nextApp.render(req, res, "/cart", parsedUrl.query);
    });
    app.use("/cart", cartRouter);
    app.use("/api/trpc", trpcExpress.createExpressMiddleware({
        router: trpc_1.appRouter,
        createContext,
    }));
    console.log("Available TRPC routes:", Object.keys(trpc_1.appRouter._def.procedures));
    app.get("/api/products", async (req, res) => {
        const myReq = req;
        const searchTerm = myReq.query.searchTerm;
        const ligaSystem = myReq.query.liga_system;
        const onSale = myReq.query.onSale;
        const page = parseInt(myReq.query.page) || 1;
        const limit = parseInt(myReq.query.limit) || 20;
        let query = {};
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
        }
        catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    app.use((req, res) => (0, next_utils_1.nextHandler)(req, res));
    next_utils_1.nextApp.prepare().then(() => {
        payload.logger.info("Next.js started");
        app.listen(PORT, () => {
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    });
};
start().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});
