"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const config_1 = require("@/config");
const use_cart_1 = require("@/hooks/use-cart");
const utils_1 = require("@/lib/utils");
const client_1 = require("@/trpc/client");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const Page = () => {
    const { items, removeItem } = (0, use_cart_1.useCart)();
    let userId;
    if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId');
    }
    const router = (0, navigation_1.useRouter)();
    const { mutate: createCheckoutSession, isLoading } = client_1.trpc.payment.createSession.useMutation({
        onSuccess: ({ url }) => {
            if (url)
                router.push(url);
        },
    });
    const productIds = items.map(({ product }) => product.id);
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    const cartTotal = items.reduce((total, { product }) => total + (product.salePrice || product.price), 0);
    const deliveryFee = cartTotal >= 1500 ? 0 : 74; // Dynamisk beregning av leveringskostnader
    const handleCheckout = (deliveryMethod) => {
        const leveringsinfo = {
            navn: "Brukerens navn",
            adresse: "Brukerens adresse",
            postnummer: "Brukerens postnummer",
            by: "Brukerens by",
            telefonnummer: "Brukerens telefonnummer".substring(0, 20), // Truncate phone number
            land: "Brukerens land",
        };
        createCheckoutSession({
            productIds,
            leveringsinfo,
            deliveryMethod,
        });
    };
    const handlePickup = () => {
        handleCheckout("pickup");
    };
    const handleDelivery = () => {
        handleCheckout("delivery");
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(head_1.default, { children: [(0, jsx_runtime_1.jsx)("title", { children: "Shopping Cart" }), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                            __html: `
              gtag('event', 'ads_conversion_Start_betalingsprosesse_1', {
              });
            `,
                        } })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold tracking-tight  sm:text-4xl", children: "Shopping Cart" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("lg:col-span-7", {
                                        "rounded-lg border-2 border-dashed border-zinc-200 p-12": isMounted && items.length === 0,
                                    }), children: [(0, jsx_runtime_1.jsx)("h2", { className: "sr-only", children: "Items in your shopping cart" }), isMounted && items.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full flex-col items-center justify-center space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "relative mb-4 h-40 w-40 text-muted-foreground", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/pungtert.png", fill: true, loading: "eager", alt: "empty shopping cart" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-2xl", children: "Din handlevogn er tom" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-center", children: "Whoops! Ingen produkter \u00E5 vise." })] })) : null, (0, jsx_runtime_1.jsx)("ul", { className: (0, utils_1.cn)({
                                                "divide-y divide-gray-200 border-b border-t border-gray-200": isMounted && items.length > 0,
                                            }), children: isMounted &&
                                                items.map(({ product }) => {
                                                    const label = config_1.PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label;
                                                    const { image } = product.images[0];
                                                    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex py-6 sm:py-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("div", { className: "relative h-24 w-24", children: typeof image !== "string" && image.url ? ((0, jsx_runtime_1.jsx)(image_1.default, { fill: true, src: image.url, alt: "product image", className: "h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48" })) : null }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4 flex flex-1 flex-col justify-between sm:ml-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between", children: (0, jsx_runtime_1.jsx)("h3", { className: "text-sm", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/product/${product.id}`, className: "font-medium text-gray-700 hover:text-gray-800", children: product.name }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex text-sm", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-muted-foreground", children: ["Category: ", label] }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm font-medium text-gray-900", children: (0, utils_1.formatPrice)(product.salePrice || product.price) })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 sm:mt-0 sm:pr-9 w-20", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 top-0", children: (0, jsx_runtime_1.jsx)(button_1.Button, { "aria-label": "remove product", onClick: () => removeItem(product.id), variant: "ghost", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-5 w-5", "aria-hidden": "true" }) }) }) })] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-4 flex space-x-2 text-sm text-gray-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "h-5 w-5 flex-shrink-0 text-green-500" }), (0, jsx_runtime_1.jsx)("span", { children: "Kvalifisert for \u00F8yeblikkelig levering" })] })] })] }, product.id));
                                                }) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-medium text-gray-900", children: "Sammendrag" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Kj\u00F8pstotal" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-900", children: isMounted ? ((0, utils_1.formatPrice)(cartTotal)) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-t border-gray-200 pt-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center text-sm text-muted-foreground", children: (0, jsx_runtime_1.jsx)("span", { children: "Leveringskostnader" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-gray-900", children: isMounted ? ((0, utils_1.formatPrice)(deliveryFee)) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-t border-gray-200 pt-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-base font-medium text-gray-900", children: "Totalpris" }), (0, jsx_runtime_1.jsx)("div", { className: "text-base font-medium text-gray-900", children: isMounted ? ((0, utils_1.formatPrice)(cartTotal + deliveryFee)) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex space-x-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: items.length === 0 || isLoading, onClick: (event) => handleCheckout("delivery"), className: "w-full bg-yellow-500", size: "lg", children: [isLoading ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin mr-1.5" })) : null, "Kj\u00F8p"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: items.length === 0 || isLoading, onClick: handlePickup, className: "w-full bg-green-900", size: "lg", children: [isLoading ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "w-4 h-4 animate-spin mr-1.5" })) : null, "Kj\u00F8p og hent"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-extralight", children: ["* Ved \u00E5 trykke", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "\u201CKj\u00F8p og hent\u201D" }), ", legger vi av produktet for deg. Du henter det i butikken n\u00E5r det passer deg."] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { className: "font-extralight", children: ["**Les om butikken og hvor du finner oss", " ", (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("a", { href: "/FdbStore", className: "text-blue-500 hover:underline", children: "her" }) })] })] })] })] })] }) })] }));
};
exports.default = Page;
