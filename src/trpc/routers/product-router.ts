import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { getPayloadClient } from '../../get-payload';
import { Product } from '@/payload-types';

export const productRouter = router({
  searchProducts: publicProcedure
    .input(z.object({
      searchTerm: z.string().optional(),
      category: z.string().optional(),
      size: z.string().optional(),
      sort: z.enum(['asc', 'desc']).optional(),
      page: z.number().default(1),
      limit: z.number().default(1000), // Set the default limit to a large number
      onSale: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      const { searchTerm, category, size, sort = 'desc', page, limit, onSale } = input;

      console.log("Input received by server:", input);

      const payload = await getPayloadClient();

      const query: any = {};

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
        const {
          docs: products,
          totalDocs: totalItems,
        } = await payload.find({
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
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products");
      }
    }),
});
