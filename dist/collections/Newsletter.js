"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
exports.Newsletter = {
    slug: 'newsletter',
    admin: {
        useAsTitle: 'email',
    },
    access: {
        read: function (_a) {
            var user = _a.req.user;
            // Gir kun tilgang til admin-brukere
            return user && user.role === 'admin';
        },
        create: function () { return true; }, // Tillater alle å sende inn e-poster
        update: function (_a) {
            var user = _a.req.user;
            return user && user.role === 'admin';
        },
        delete: function (_a) {
            var user = _a.req.user;
            return user && user.role === 'admin';
        },
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
            defaultValue: function () { return new Date(); },
        },
    ],
};
