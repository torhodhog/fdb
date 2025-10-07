"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesDataRouter = void 0;
const zod_1 = require("zod");
const get_payload_1 = require("../../get-payload");
const trpc_1 = require("../trpc");
exports.favoritesDataRouter = (0, trpc_1.router)({
    getFavoritesData: trpc_1.publicProcedure
        .input(zod_1.z.object({
        productIds: zod_1.z.array(zod_1.z.string()),
        userId: zod_1.z.string().nullish(),
    }))
        .query(async ({ input }) => {
        const { productIds, userId } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        if (productIds.length === 0) {
            return {
                favoriteCounts: {},
                userFavorites: {},
            };
        }
        // 1. Fetch all favorite entries for the given products
        const { docs: allFavorites } = await payload.find({
            collection: 'favorites',
            where: {
                product: { in: productIds },
            },
            limit: productIds.length * 100, // High limit to get all
        });
        // 2. Calculate favorite counts for each product
        const favoriteCounts = allFavorites.reduce((acc, fav) => {
            const productId = typeof fav.product === 'string' ? fav.product : fav.product.id;
            acc[productId] = (acc[productId] || 0) + 1;
            return acc;
        }, {});
        // 3. Determine which products the current user has favorited
        const userFavorites = {};
        if (userId) {
            const userFavs = allFavorites.filter((fav) => {
                const favUser = typeof fav.user === 'string' ? fav.user : fav.user.id;
                return favUser === userId;
            });
            userFavs.forEach((fav) => {
                const productId = typeof fav.product === 'string' ? fav.product : fav.product.id;
                userFavorites[productId] = true;
            });
        }
        // Fill in zeros for products with no favorites
        productIds.forEach((id) => {
            if (!favoriteCounts[id]) {
                favoriteCounts[id] = 0;
            }
        });
        return { favoriteCounts, userFavorites };
    }),
});
