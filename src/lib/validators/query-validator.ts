import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  searchTerm: z.string().optional(), // Add this line
  liga_system: z.string().optional(), // Add this line
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
