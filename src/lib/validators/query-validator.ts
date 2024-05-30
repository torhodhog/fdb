import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  searchTerm: z.string().optional(),
  liga_system: z.string().optional(),
  onSale: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  names: z.array(z.string()).optional(),
  // Legg til finalSale her
  finalSale: z.boolean().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;