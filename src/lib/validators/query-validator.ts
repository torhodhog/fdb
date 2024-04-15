import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  searchTerm: z.string().optional(),
  liga_system: z.string().optional(),
  onSale: z.boolean().optional(), // Legg til denne linjen
});

export type TQueryValidator = z.infer<typeof QueryValidator>;