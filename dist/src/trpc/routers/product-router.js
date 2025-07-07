"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const get_payload_1 = require("../../get-payload");
exports.productRouter = (0, trpc_1.router)({
    searchProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        searchTerm: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        size: zod_1.z.string().optional(),
        sort: zod_1.z.enum(['asc', 'desc']).optional(),
        page: zod_1.z.number().default(1),
        limit: zod_1.z.number().default(1000), // Set the default limit to a large number
        onSale: zod_1.z.boolean().optional(),
    }))
        .query(async ({ input }) => {
        const { searchTerm, category, size, sort = 'desc', page, limit, onSale } = input;
        console.log("Input received by server:", input);
        const payload = await (0, get_payload_1.getPayloadClient)();
        const query = {};
        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (size) {
            query.size = size;
        }
        if (onSale !== undefined) {
            query.onSale = onSale;
        }
        console.log("Query constructed by server:", query);
        const sortOrder = sort === 'asc' ? '+' : '-';
        try {
            const { docs: products, totalDocs: totalItems, } = await payload.find({
                collection: 'products',
                where: {
                    isSold: { equals: false }, // Only show unsold products
                    approvedForSale: { equals: "approved" }, // Only show approved products
                    ...query,
                },
                sort: `${sortOrder}createdAt`,
                limit,
                page,
            });
            console.log("Products fetched by server:", products);
            return {
                products,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
            };
        }
        catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Error fetching products");
        }
    }),
});
