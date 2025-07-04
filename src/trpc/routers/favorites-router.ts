import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getPayloadClient } from '../../get-payload';
import { TRPCError } from '@trpc/server';

export const favoritesRouter = router({
  toggleFavorite: publicProcedure
    .input(z.object({ productId: z.string(), userId: z.string(), isFavorited: z.boolean() }))
    .mutation(async ({ input }) => {
      const { productId, userId, isFavorited } = input;
      const payload = await getPayloadClient();

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
      } else {
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
