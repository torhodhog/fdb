"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const HeroImage_1 = __importDefault(require("@/components/HeroImage"));
const Info_1 = __importDefault(require("@/components/Info"));
const MaxWidthWrapper_1 = __importDefault(require("@/components/MaxWidthWrapper"));
const lucide_react_1 = require("lucide-react");
const head_1 = __importDefault(require("next/head"));
const ProductReel_1 = __importDefault(require("../components/ProductReel"));
const page_1 = __importDefault(require("./Sale/page"));
const FavorittPall_1 = __importDefault(require("@/components/FavorittPall"));
const perks = [
    {
        name: "Gratis frakt",
        Icon: lucide_react_1.ArrowDownToLine,
        description: "På alle bestillinger over 1500 kr",
    },
    {
        name: "Kvalitet",
        Icon: lucide_react_1.CheckCircleIcon,
        description: "Vi har fokus på kvalitet og originalitet og ønsker at alle produkter vi selger skal være av ypperste kvalitet. Ikke fornøyd? Vi har 30 dagers åpent kjøp.",
    },
    {
        name: "Bærekraft",
        Icon: lucide_react_1.Leaf,
        description: "Vi bryr oss om miljøet og sender våre varer på den mest miljøbesparende måten",
    },
];
function Home() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(head_1.default, { children: [(0, jsx_runtime_1.jsx)("title", { children: "Home - Fotballdraktbutikken" }), (0, jsx_runtime_1.jsx)("meta", { name: "description", content: "Welcome to Fotballdraktbutikken" }), (0, jsx_runtime_1.jsx)("link", { rel: "icon", href: "/favicon.ico" }), (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: "no", href: "https://fotballdb.no" }), (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: "en", href: "https://en.fotballdb.no" })] }), (0, jsx_runtime_1.jsxs)(MaxWidthWrapper_1.default, { className: "overflow-visible", children: [(0, jsx_runtime_1.jsxs)("div", { className: "z-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-transparent py-4", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center space-x-8" }) }), (0, jsx_runtime_1.jsx)("div", { className: "z-0", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-transparent rounded-br-[10px] rounded-bl-[10px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-8", children: [(0, jsx_runtime_1.jsx)("a", { className: "text-black text-lg font-semibold hover:underline", href: "/products", children: "Produkter" }), (0, jsx_runtime_1.jsxs)("a", { className: "text-black text-lg font-semibold hover:underline", href: "/Sale", children: ["Salg ", (0, jsx_runtime_1.jsx)("span", { className: "text-red-700", children: "%" })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(HeroImage_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(ProductReel_1.default, { title: "Nye produkter", href: "/products", hideSoldItems: true, query: {
                            limit: 10,
                            sortBy: "createdAt",
                            sortOrder: "desc",
                        } })] }), (0, jsx_runtime_1.jsx)(page_1.default, {}), (0, jsx_runtime_1.jsx)("section", { children: (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { className: "py-20", children: (0, jsx_runtime_1.jsx)(FavorittPall_1.default, {}) }) }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { className: "py-20", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 z-30", children: perks.map((perk) => ((0, jsx_runtime_1.jsxs)("div", { className: "text-center md:flex md:items-start md:text-left lg:block lg:text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "md:flex-shrink-0 flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900", children: (0, jsx_runtime_1.jsx)(perk.Icon, { className: "w-1/3 h-1/3" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-medium", children: perk.name }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-sm text-muted-foreground", children: perk.description })] })] }, perk.name))) }) }), (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "lg:block hidden m-8", children: (0, jsx_runtime_1.jsx)(Info_1.default, {}) }) })] })] }));
}
