"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValidator = void 0;
const zod_1 = require("zod");
exports.QueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.number().optional(),
    searchTerm: zod_1.z.string().optional(),
    liga_system: zod_1.z.string().optional(),
    onSale: zod_1.z.boolean().optional(),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    names: zod_1.z.array(zod_1.z.string()).optional(),
    // Legg til finalSale her
    finalSale: zod_1.z.boolean().optional(),
});
