"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValidator = void 0;
var zod_1 = require("zod");
exports.QueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(), // Du kan vurdere å endre navn på denne hvis den blir erstattet av sortBy/sortOrder
    limit: zod_1.z.number().optional(),
    searchTerm: zod_1.z.string().optional(),
    liga_system: zod_1.z.string().optional(),
    onSale: zod_1.z.boolean().optional(),
    sortBy: zod_1.z.string().optional(), // Feltet som skal sorteres etter, eks: 'createdAt'
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional() // Nytt felt for sorteringens rekkefølge
});
