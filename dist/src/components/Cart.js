"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const sheet_1 = require("./ui/sheet");
const separator_1 = require("./ui/separator");
const utils_1 = require("@/lib/utils");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("./ui/button");
const image_1 = __importDefault(require("next/image"));
const use_cart_1 = require("@/hooks/use-cart");
const react_1 = require("react");
const react_scroll_area_1 = require("@radix-ui/react-scroll-area");
const CartItem_1 = __importDefault(require("./CartItem"));
const Cart = () => {
    const { items } = (0, use_cart_1.useCart)();
    const itemCount = items.length;
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    const cartTotal = items.reduce((total, { product }) => total + (product.salePrice || product.price), 0);
    const deliveryFee = cartTotal >= 1500 ? 0 : 74; // Legger til levering kun hvis total er under 1500 NOK
    const fee = 0;
    return ((0, jsx_runtime_1.jsxs)(sheet_1.Sheet, { children: [(0, jsx_runtime_1.jsxs)(sheet_1.SheetTrigger, { className: "group -m-2 flex items-center p-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingCartIcon, { "aria-hidden": "true", className: "h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800", children: itemCount })] }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { className: "flex w-full flex-col pr-0 sm:max-w-lg", children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetHeader, { className: "space-y-2.5 pr-6", children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetTitle, { children: ["Handlevogn(", itemCount, ")"] }) }), itemCount > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col pr-6", children: (0, jsx_runtime_1.jsx)(react_scroll_area_1.ScrollArea, { children: items.map(({ product }) => ((0, jsx_runtime_1.jsx)(CartItem_1.default, { product: product }, product.id))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 pr-6", children: [(0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1", children: "Levering" }), (0, jsx_runtime_1.jsx)("span", { children: isMounted ? ((0, utils_1.formatPrice)(deliveryFee)) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { children: isMounted ? ((0, utils_1.formatPrice)(cartTotal + deliveryFee)) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })) })] })] }), (0, jsx_runtime_1.jsx)(sheet_1.SheetFooter, { children: (0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/cart", className: (0, button_1.buttonVariants)({
                                                    className: "w-full",
                                                }), children: "Fortsett til betaling" }) }) })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full flex-col items-center justify-center space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "relative mb-40 h-60 w-60  text-muted-foreground", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/empty-cart.jpeg", className: "rounded-md height-full", fill: true, alt: "empty shopping cart" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-xl font-semibold", children: "Handlekurven er tom" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", className: (0, button_1.buttonVariants)({
                                        variant: "link",
                                        size: "sm",
                                        className: "text-sm text-muted-foreground",
                                    }), children: "Legg produkter i handlekurven for \u00E5 kj\u00F8pe" }) })] }))] })] }));
};
exports.default = Cart;
