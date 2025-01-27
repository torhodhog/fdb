import { z } from "zod";

import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { paymentRouter } from "./payment-router";
import { productRouter } from "./routers/product-router";
import { publicProcedure, router } from "./trpc";
import { equal } from "assert";

// 1) Egen prosedyre for "fritt søk"
export const searchProducts = publicProcedure
  .input(z.object({ term: z.string().optional() }))
  .query(async ({ input }) => {
    const payload = await getPayloadClient();
    const term = input.term?.trim() ?? "";

    // Hvis brukeren ikke har skrevet noe, returner tom array.
    if (!term) {
      return [];
    }

    try {
      console.log("SØKETERM:", term);

      // Eksempel: Vil du bare vise "approved" produkter?
      // Legg inn: approvedForSale: { equals: "approved" },
      const { docs } = await payload.find({
        collection: "products",
        where: {
          
            approvedForSale: { equals: "approved" },
          name: {
            contains: term, 
          },
        },
        limit: 10,
        depth: 1,
      });
      return docs;
      
    } catch (error) {
      console.error("Error searching products:", error);
      throw new Error("Error searching products");
    }
  });
export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  product: productRouter,

  // 2) Din eksisterende rute for å hente et uendelig antall produkter med filtrering
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000).default(20),
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
      } = query as {
        sortBy?: string;
        sortOrder?: "asc" | "desc";
        limit: number;
        searchTerm?: string;
        liga_system?: string;
        names?: string[];
        [key: string]: any;
      };

      const payload = await getPayloadClient();
      const page = cursor ?? 1;

      const parsedQueryOpts: Record<string, any> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        if (key === "onSale") {
          parsedQueryOpts[key] = {
            equals: value === "true" || value === true,
          };
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

        console.log(`Fetched items: ${items.length}`, items); // Log the fetched items
        console.log("Total documents:", totalDocs); // Log the total documents

        return {
          items,
          totalDocs,
        };
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
        throw new Error("Error fetching products");
      }
    }),

  // 3) Legg til den nye "searchProducts"-prosedyren
  searchProducts,
});

export type AppRouter = typeof appRouter;
