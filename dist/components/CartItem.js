"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const config_1 = require("@/config");
const use_cart_1 = require("@/hooks/use-cart");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const CartItem = ({ product }) => {
    const { image } = product.images[0];
    const price = product.salePrice || product.price;
    const { removeItem } = (0, use_cart_1.useCart)();
    const label = config_1.PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
    (0, react_1.useEffect)(() => {
        const checkAvailability = async () => {
            const response = await fetch(`/api/products/${product.id}`);
            const data = await response.json();
            if (data.isSold) {
                removeItem(product.id);
            }
        };
        checkAvailability();
    }, [product, removeItem]);
    return ((0, jsx_runtime_1.jsx)("div", { className: 'space-y-3 py-2', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-start justify-between gap-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center space-x-4', children: [(0, jsx_runtime_1.jsx)("div", { className: 'relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded', children: typeof image !== 'string' && image.url ? ((0, jsx_runtime_1.jsx)(image_1.default, { className: '-z-10 object-center', src: image.url, alt: 'Product image', fill: true, style: { objectFit: 'cover' } })) : ((0, jsx_runtime_1.jsx)("div", { className: 'flex h-full items-center justify-center bg-secondary', children: (0, jsx_runtime_1.jsx)(lucide_react_1.ImageIcon, { "aria-hidden": 'true', className: 'h-4 w-4 text-muted-foreground' }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col self-start', children: [(0, jsx_runtime_1.jsx)("span", { className: 'line-clamp-1 text-sm font-medium mb-1', children: product.name }), (0, jsx_runtime_1.jsx)("span", { className: 'line-clamp-1 text-xs capitalize text-muted-foreground', children: label }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 text-xs text-muted-foreground', children: (0, jsx_runtime_1.jsxs)("button", { onClick: () => removeItem(product.id), className: 'flex items-center gap-0.5', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: 'w-3 h-4' }), "Slett"] }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'flex flex-col space-y-1 font-medium', children: (0, jsx_runtime_1.jsx)("span", { className: 'ml-auto line-clamp-1 text-sm', children: (0, utils_1.formatPrice)(price) }) })] }) }));
};
exports.default = CartItem;
