"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("@/trpc/client");
const client_2 = require("@trpc/client");
const Providers = ({ children }) => {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient());
    const [trpcClient] = (0, react_1.useState)(() => client_1.trpc.createClient({
        links: [
            (0, client_2.httpBatchLink)({
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: 'include',
                    });
                },
            }),
        ],
    }));
    return ((0, jsx_runtime_1.jsx)(client_1.trpc.Provider, { client: trpcClient, queryClient: queryClient, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: children }) }));
};
exports.default = Providers;
