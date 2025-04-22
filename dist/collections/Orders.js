"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin")
        return true;
    return {
        user: user === null || user === void 0 ? void 0 : user.id,
    };
};
exports.Orders = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "En oversikt over dine bestillinger hos Fotballdraktbutikken",
    },
    access: {
        read: yourOwn,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: false,
        },
        {
            name: "user",
            type: "relationship",
            admin: {
                hidden: true,
            },
            relationTo: "users",
            required: true,
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: true,
        },
        {
            name: 'deliveryMethod',
            label: 'Delivery Method',
            type: 'select',
            options: [
                { label: 'Pickup', value: 'pickup' },
                { label: 'Delivery', value: 'delivery' },
            ],
            required: true,
        },
    ],
};
