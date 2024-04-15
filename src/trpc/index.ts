import { z } from 'zod'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { paymentRouter } from './payment-router'

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      console.log(input); // log the input

      const { cursor } = input;
      const { sort, limit, searchTerm, liga_system, ...queryOpts } = input.query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, any> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
  if (key === 'onSale') {
    parsedQueryOpts[key] = { equals: value === 'true' || value === true };
  } else {
    parsedQueryOpts[key] = { equals: value };
  }
});

      if (searchTerm) {
        parsedQueryOpts.name = { $regex: new RegExp(searchTerm, 'i') };
      }
      if (liga_system) {
        parsedQueryOpts.liga_system = { equals: liga_system };
      }

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;