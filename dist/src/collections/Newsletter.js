"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
exports.Newsletter = {
    slug: 'newsletter',
    admin: {
        useAsTitle: 'email',
    },
    access: {
        read: ({ req: { user } }) => {
            // Gir kun tilgang til admin-brukere
            return user && user.role === 'admin';
        },
        create: () => true, // Tillater alle å sende inn e-poster
        update: ({ req: { user } }) => user && user.role === 'admin',
        delete: ({ req: { user } }) => user && user.role === 'admin',
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true, // Sikrer at samme e-post ikke lagres flere ganger
        },
        {
            name: 'createdAt',
            type: 'date',
            admin: {
                readOnly: true,
            },
            defaultValue: () => new Date(),
        },
    ],
};
