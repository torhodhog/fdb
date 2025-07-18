// Definerer hovedrouteren for tRPC (appRouter) og eksporterer prosedyrene for:
// - Autentisering (authRouter)
// - Betaling (paymentRouter)
// - Produktspørringer (productRouter)
// Inkluderer også egen "searchProducts" for søk, og "getInfiniteProducts" for uendelig scroll.
// Alt bruker Payload som database via getPayloadClient().


import { z } from "zod"; // Zod validerer input og sørger for at vi bare henter produkter med riktig format.


import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { paymentRouter } from "./payment-router";
import { productRouter } from "./routers/product-router";
import { favoritesRouter } from './routers/favorites-router';
import { favoritesDataRouter } from './routers/favorites-data-router';
import { publicProcedure, router } from "./trpc";

// 1) Egen prosedyre for "fritt søk"
export const searchProducts = publicProcedure
  .input(z.object({ term: z.string().optional() }))
  .query(async ({ input }) => {
    const payload = await getPayloadClient();
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
          isSold: { equals: false },
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
    } catch (err) {
      console.error("Error searching products:", err);
      throw new Error("Error searching products");
    }
  });
  
export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  product: productRouter,
  favorites: favoritesRouter,
  favoritesData: favoritesDataRouter,

  // 2) Din eksisterende rute for å hente et uendelig antall produkter med filtrering
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000).default(20),
        cursor: z.number().nullish(), // Cursor for pagination
        query: QueryValidator.extend({
          sortBy: z.string().optional(),
          sortOrder: z.enum(["asc", "desc"]).optional(),
          names: z.array(z.string()).optional(), 
        }),
      })
    )
    .query(async ({ input }) => {
      console.log("Input received:", input); 
      const { cursor, query } = input;
      const {
        sortBy = "createdAt",
        sortOrder = "desc",
        limit,
        searchTerm,
        liga_system,
        names, 
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
            isSold: {
              equals: false,
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
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
        throw new Error("Error fetching products");
      }
    }),

  // 3) Legg til den nye "searchProducts"-prosedyren
  searchProducts,
});

export type AppRouter = typeof appRouter;
