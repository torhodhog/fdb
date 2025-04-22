"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const trpc_1 = require("@/trpc");
const fetch_1 = require("@trpc/server/adapters/fetch");
const handler = (req) => {
    (0, fetch_1.fetchRequestHandler)({
        endpoint: "/api/trpc",
        req,
        router: trpc_1.appRouter,
        // @ts-expect-error context already exists
        createContext: () => ({ req, res: {} }),
    });
};
exports.GET = handler;
exports.POST = handler;
