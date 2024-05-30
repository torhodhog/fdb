import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { paymentRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.number().nullish(), // Cursor for pagination
        query: QueryValidator.extend({
          sortBy: z.string().optional(),
          sortOrder: z.enum(["asc", "desc"]).optional(),
          names: z.array(z.string()).optional(), // Add names to query schema
        }),
      })
    )
    .query(async ({ input }) => {
      console.log("Input received:", input); // Log the input

      const { cursor, query } = input;
      const {
        sortBy = "createdAt",
        sortOrder = "desc",
        limit,
        searchTerm,
        liga_system,
        names, // Add names from input
        ...queryOpts
      } = query;

      const payload = await getPayloadClient();
      const page = cursor ?? 1;

      const parsedQueryOpts: Record<string, any> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        if (key === "onSale") {
          parsedQueryOpts[key] = { equals: value === "true" || value === true };
        } else {
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

      try {
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
          sort: sortString,
          depth: 1,
          limit,
          page,
        });

        console.log(`Fetched items: ${items.length}`, items); // Log the fetched items

        return {
          items,
          nextPage: hasNextPage ? nextPage : null,
          previousPage: page > 1 ? page - 1 : null,
        };
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
        throw new Error("Error fetching products");
      }
    }),
});

export type AppRouter = typeof appRouter;
