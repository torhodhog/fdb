import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(), // Du kan vurdere å endre navn på denne hvis den blir erstattet av sortBy/sortOrder
  limit: z.number().optional(),
  searchTerm: z.string().optional(),
  liga_system: z.string().optional(),
  onSale: z.boolean().optional(),
  sortBy: z.string().optional(), // Feltet som skal sorteres etter, eks: 'createdAt'
  sortOrder: z.enum(["asc", "desc"]).optional() // Nytt felt for sorteringens rekkefølge
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
