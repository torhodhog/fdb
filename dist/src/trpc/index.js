"use strict";
// Definerer hovedrouteren for tRPC (appRouter) og eksporterer prosedyrene for:
// - Autentisering (authRouter)
// - Betaling (paymentRouter)
// - Produktspørringer (productRouter)
// Inkluderer også egen "searchProducts" for søk, og "getInfiniteProducts" for uendelig scroll.
// Alt bruker Payload som database via getPayloadClient().
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.searchProducts = void 0;
const zod_1 = require("zod"); // Zod validerer input og sørger for at vi bare henter produkter med riktig format.
const get_payload_1 = require("../get-payload");
const query_validator_1 = require("../lib/validators/query-validator");
const auth_router_1 = require("./auth-router");
const payment_router_1 = require("./payment-router");
const product_router_1 = require("./routers/product-router");
const favorites_router_1 = require("./routers/favorites-router");
const favorites_data_router_1 = require("./routers/favorites-data-router");
const trpc_1 = require("./trpc");
// 1) Egen prosedyre for "fritt søk"
exports.searchProducts = trpc_1.publicProcedure
    .input(zod_1.z.object({ term: zod_1.z.string().optional() }))
    .query(async ({ input }) => {
    const payload = await (0, get_payload_1.getPayloadClient)();
    const term = input.term?.trim() ?? "";
    if (!term) {
        return { docs: [], hasMore: false };
    }
    // Øker limit til  11, sånn at vi kan se om det finnes "flere enn 10"
    const LIMIT = 11;
    try {
        const { docs, totalDocs } = await payload.find({
            collection: "products",
            where: {
                approvedForSale: { equals: "approved" },
                name: {
                    contains: term,
                },
            },
            limit: LIMIT,
        });
        // Hvis vi har mer enn 10 elementer, setter vi hasMore = true
        const hasMore = docs.length > 10;
        // Returner bare de 10 første i `docs`
        const slicedDocs = hasMore ? docs.slice(0, 10) : docs;
        return {
            docs: slicedDocs,
            hasMore,
            totalDocs,
        };
    }
    catch (err) {
        console.error("Error searching products:", err);
        throw new Error("Error searching products");
    }
});
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    payment: payment_router_1.paymentRouter,
    product: product_router_1.productRouter,
    favorites: favorites_router_1.favoritesRouter,
    favoritesData: favorites_data_router_1.favoritesDataRouter,
    // 2) Din eksisterende rute for å hente et uendelig antall produkter med filtrering
    getInfiniteProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(1000).default(20),
        cursor: zod_1.z.number().nullish(), // Cursor for pagination
        query: query_validator_1.QueryValidator.extend({
            sortBy: zod_1.z.string().optional(),
            sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
            names: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    }))
        .query(async ({ input }) => {
        console.log("Input received:", input);
        const { cursor, query } = input;
        const { sortBy = "createdAt", sortOrder = "desc", limit, searchTerm, liga_system, names, ...queryOpts } = query;
        const payload = await (0, get_payload_1.getPayloadClient)();
        const page = cursor ?? 1;
        const parsedQueryOpts = {};
        Object.entries(queryOpts).forEach(([key, value]) => {
            if (key === "onSale") {
                parsedQueryOpts[key] = {
                    equals: value === "true" || value === true,
                };
            }
            else {
                parsedQueryOpts[key] = { equals: value };
            }
        });
        if (searchTerm) {
            parsedQueryOpts.name = { $regex: new RegExp(searchTerm, "i") };
        }
        if (liga_system) {
            parsedQueryOpts.liga_system = { equals: liga_system };
        }
        if (names) {
            parsedQueryOpts.name = { in: names }; // Ensure names are handled correctly
        }
        const sortDirection = sortOrder === "desc" ? "-" : "+";
        const sortString = `${sortDirection}${sortBy}`;
        console.log("Parsed query options:", parsedQueryOpts); // Log parsed query options
        console.log("Sort string:", sortString); // Log sort string
        try {
            const { docs: items, totalDocs } = await payload.find({
                collection: "products",
                where: {
                    approvedForSale: {
                        equals: "approved",
                    },
                    ...parsedQueryOpts,
                },
                sort: sortString,
                depth: 1,
                limit,
                page,
            });
            return {
                items,
                totalDocs,
            };
        }
        catch (error) {
            console.error("Error fetching products:", error); // Log any errors
            throw new Error("Error fetching products");
        }
    }),
    // 3) Legg til den nye "searchProducts"-prosedyren
    searchProducts: exports.searchProducts,
});
