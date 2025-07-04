"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const get_payload_1 = require("../../get-payload");
exports.favoritesRouter = (0, trpc_1.router)({
    toggleFavorite: trpc_1.publicProcedure
        .input(zod_1.z.object({ productId: zod_1.z.string(), userId: zod_1.z.string(), isFavorited: zod_1.z.boolean() }))
        .mutation(async ({ input }) => {
        const { productId, userId, isFavorited } = input;
        const payload = await (0, get_payload_1.getPayloadClient)();
        if (isFavorited) {
            // Remove from favorites
            const { docs: favorites } = await payload.find({
                collection: 'favorites',
                where: {
                    product: { equals: productId },
                    user: { equals: userId },
                },
            });
            if (favorites.length > 0) {
                await payload.delete({
                    collection: 'favorites',
                    id: favorites[0].id,
                });
            }
        }
        else {
            // Add to favorites
            await payload.create({
                collection: 'favorites',
                data: {
                    product: productId,
                    user: userId,
                },
            });
        }
        return { success: true };
    }),
});
