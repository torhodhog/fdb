"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === 'admin')
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "verify your account",
                    buttonText: "Verify Account",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token)
                });
            },
        },
        forgotPassword: {
            generateEmailHTML: function (_a) {
                var _b = _a === void 0 ? {} : _a, req = _b.req, token = _b.token, user = _b.user;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "reset your password",
                    buttonText: "Reset Password",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/reset-password?token=").concat(token)
                });
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        },
        defaultColumns: ['id'],
    },
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: function () { return false; },
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'product_files',
            label: 'Product files',
            admin: {
                condition: function () { return false; },
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true,
        },
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'text',
            required: false,
        },
        {
            name: 'address',
            label: 'Address',
            type: 'text',
            required: false,
            admin: {
                condition: function (_a) {
                    var operation = _a.operation;
                    return operation !== 'forgotPassword';
                },
            },
        },
        {
            name: 'country',
            label: 'Country',
            type: 'text',
            required: false,
            admin: {
                condition: function (_a) {
                    var operation = _a.operation;
                    return operation !== 'forgotPassword';
                },
            },
        },
        {
            name: 'postalCode',
            label: 'Postal Code',
            type: 'text',
            required: false,
            admin: {
                condition: function (_a) {
                    var operation = _a.operation;
                    return operation !== 'forgotPassword';
                },
            },
        },
        {
            name: 'favorites',
            label: 'Favorites',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            required: false,
        },
    ],
    hooks: {
        beforeChange: [
            function (_a) {
                var data = _a.data, operation = _a.operation;
                if (operation === 'update' && data && data._isForgotPassword) {
                    // Skip validation for address, country, and postalCode during forgotPassword
                    data.address = undefined;
                    data.country = undefined;
                    data.postalCode = undefined;
                }
                return data;
            },
        ],
    },
};
