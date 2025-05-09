"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFiles = void 0;
const addUser = ({ req, data }) => {
    const user = req.user;
    return { ...data, user: user?.id };
};
const yourOwnAndPurchased = async ({ req }) => {
    const user = req.user;
    if (user?.role === "admin")
        return true;
    if (!user)
        return false;
    const { docs: products } = await req.payload.find({
        collection: "products",
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    });
    const ownProductFileIds = products.map((prod) => prod.product_files).flat();
    const { docs: orders } = await req.payload.find({
        collection: "orders",
        depth: 2,
        where: {
            user: {
                equals: user.id,
            },
        },
    });
    const purchasedProductFileIds = orders
        .map((order) => {
        return order.products.map((product) => {
            if (typeof product === "string")
                return req.payload.logger.error("Search depth not sufficient to find purchased file IDs");
            if (product.product_files) {
                return product.product_files.map((product_file) => {
                    if (product_file.file && typeof product_file.file !== 'string') {
                        return product_file.file.id;
                    }
                });
            }
        });
    })
        .filter(Boolean)
        .flat();
    return {
        id: {
            in: [...ownProductFileIds, ...purchasedProductFileIds],
        },
    };
};
exports.ProductFiles = {
    slug: "product_files",
    admin: {
        hidden: ({ user }) => user.role !== "admin",
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
        update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
    },
    upload: {
        staticURL: "/product_files",
        staticDir: "product_files",
        mimeTypes: ["image/*", "font/*", "application/postscript"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            admin: {
                condition: () => false,
            },
            hasMany: false,
            required: true,
        },
        {
            name: 'liga_system',
            label: 'Liga System',
            type: 'text',
        },
        {
            name: 'tilstand',
            label: 'Tilstand',
            type: 'select',
            options: [
                { label: "10 - Utmerket", value: "10" },
                { label: "9 - Bra", value: "9" },
                { label: "8 - Små feil", value: "8" },
                { label: "7 - Synlige feil/skader", value: "7" },
                // Legg til flere tilstandsnivåer etter behov
            ],
        },
        {
            name: 'size',
            label: 'Størrelse',
            type: 'select',
            options: [
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
                { label: "XL", value: "XL" },
                // Legg til flere størrelser etter behov
            ],
        },
        {
            name: 'isSold',
            label: 'Sold',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                condition: ({ req }) => req.user.role === 'admin',
            },
        },
    ],
};
