"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AddToCartButton_1 = __importDefault(require("@/components/AddToCartButton"));
const ImageSlider_1 = __importDefault(require("@/components/ImageSlider"));
const MaxWidthWrapper_1 = __importDefault(require("@/components/MaxWidthWrapper"));
const ProductReel_1 = __importDefault(require("@/components/ProductReel"));
const config_1 = require("@/config");
const getProducts_1 = require("@/lib/getProducts");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
];
const Page = async ({ params, searchParams }) => {
    const { productId } = params;
    const page = searchParams.page || "1";
    const product = await (0, getProducts_1.fetchProduct)(productId);
    if (!product)
        return (0, navigation_1.notFound)();
    const label = config_1.PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
    const validUrls = product.images
        .map(({ image }) => (typeof image === "string" ? image : image?.url))
        .filter(Boolean);
    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < 10; i++) {
            stars.push(i < rating ? "⭐" : "☆");
        }
        return (0, jsx_runtime_1.jsx)("p", { children: stars });
    };
    const price = product.salePrice || product.price;
    const isOnSale = Boolean(product.salePrice);
    const isExclusive = product.exclusive;
    return ((0, jsx_runtime_1.jsxs)(MaxWidthWrapper_1.default, { className: "bg-white", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:max-w-lg lg:self-end", children: [(0, jsx_runtime_1.jsx)("ol", { className: "flex items-center space-x-2", children: BREADCRUMBS.map((breadcrumb, i) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center text-sm", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: breadcrumb.href, className: "font-medium text-sm text-muted-foreground hover:text-gray-900", children: breadcrumb.name }), i !== BREADCRUMBS.length - 1 ? ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", className: "ml-2 h-5 w-5 flex-shrink-0 text-gray-300", children: (0, jsx_runtime_1.jsx)("path", { d: "M5.555 17.776l8-16 .894.448-8 16-.894-.448z" }) })) : null] }) }, breadcrumb.href))) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: product.name }) }), (0, jsx_runtime_1.jsxs)("section", { className: "mt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: `font-medium ${isOnSale ? 'text-red-500' : 'text-gray-900'}`, children: (0, utils_1.formatPrice)(price) }), (0, jsx_runtime_1.jsx)("div", { className: "ml-4 border-1 text-muted-foreground border-gray-300 pl-4", children: label })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 space-y-6", children: (0, jsx_runtime_1.jsx)("p", { className: "text-base text-muted-foreground", children: product.description }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { "aria-hidden": true, className: "h-5 w-5 flex-shrink-0 text-green-500" }), (0, jsx_runtime_1.jsx)("p", { className: "ml-2 text-sm text-muted-foreground", children: "Sendes innen 24 timer etter kj\u00F8p" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 border border-gray-200 mt-4 rounded-md bg-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "mt-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold", children: "Tilstand" }), (0, jsx_runtime_1.jsx)(StarRating, { rating: parseInt(product.tilstand || "0") }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsxs)("h2", { className: "text-lg font-bold", children: ["St\u00F8rrelse: ", product.size] }) }), isExclusive && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/KunNettEn.png", alt: "Exclusive product", width: 120, height: 120, className: "object-contain" }) }))] }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center", children: (0, jsx_runtime_1.jsx)("div", { className: "aspect-square rounded-lg relative", children: (0, jsx_runtime_1.jsx)(ImageSlider_1.default, { urls: validUrls }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "mt-10", children: (0, jsx_runtime_1.jsx)(AddToCartButton_1.default, { product: product }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-6 text-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "group inline-flex text-sm text-medium", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { "aria-hidden": "true", className: "mr-2 h-5 w-5 flex-shrink-0 text-gray-400" }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground hover:text-gray-700", children: "30 dagers \u00E5pent kj\u00F8p" })] }) })] }) })] }) }), (0, jsx_runtime_1.jsx)(ProductReel_1.default, { href: "/products", query: { liga_system: product.liga_system || undefined, limit: 4 }, title: `Lignende produkter`, subtitle: `Finn lignende kvalitetsdrakter som '${product.name}' ` })] }));
};
exports.default = Page;
