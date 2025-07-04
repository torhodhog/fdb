import { z } from 'zod';
import { getPayloadClient } from '../../get-payload';
import { publicProcedure, router } from '../trpc';
import { Favorite } from '../../payload-types';

export const favoritesDataRouter = router({
  getFavoritesData: publicProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
        userId: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { productIds, userId } = input;
      const payload = await getPayloadClient();

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
      const favoriteCounts = (allFavorites as Favorite[]).reduce<Record<string, number>>((acc, fav) => {
        const productId = typeof fav.product === 'string' ? fav.product : fav.product.id;
        acc[productId] = (acc[productId] || 0) + 1;
        return acc;
      }, {});

      // 3. Determine which products the current user has favorited
      const userFavorites: Record<string, boolean> = {};
      if (userId) {
        const userFavs = (allFavorites as Favorite[]).filter((fav) => {
            const favUser = typeof fav.user === 'string' ? fav.user : fav.user.id
            return favUser === userId
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
