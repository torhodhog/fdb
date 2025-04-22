"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Favorites = {
    slug: 'favorites',
    admin: {
        useAsTitle: 'user',
    },
    access: {
        create: ({ req: { user } }) => {
            // Only allow authenticated users to create favorites
            return Boolean(user);
        },
        delete: ({ req: { user } }) => {
            // Only allow authenticated users to delete their own favorites
            return Boolean(user);
        },
        read: ({ req: { user } }) => {
            if (!user)
                return false;
            return {
                user: {
                    equals: user.id,
                },
            };
        },
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
