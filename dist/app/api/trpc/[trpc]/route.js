"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const trpc_1 = require("@/trpc");
const fetch_1 = require("@trpc/server/adapters/fetch");
const handler = async (req) => {
    return (0, fetch_1.fetchRequestHandler)({
        endpoint: "/api/trpc",
        req,
        router: trpc_1.appRouter,
        createContext: async () => {
            return {
                req: req,
                res: {}
            };
        },
    });
};
exports.GET = handler;
exports.POST = handler;
