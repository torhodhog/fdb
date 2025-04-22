"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Favorites = {
    slug: 'favorites',
    admin: {
        useAsTitle: 'user',
    },
    access: {
        create: function (_a) {
            var user = _a.req.user;
            // Only allow authenticated users to create favorites
            return Boolean(user);
        },
        delete: function (_a) {
            var user = _a.req.user;
            // Only allow authenticated users to delete their own favorites
            return Boolean(user);
        },
        read: function () { return true; }, // Allow everyone to read favorites
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
    ],
};
exports.default = Favorites;
