"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("@/trpc/client");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const HeroDraktDisplay = () => {
    const [selectedDrakter, setSelectedDrakter] = (0, react_1.useState)([]);
    const { data } = client_1.trpc.getInfiniteProducts.useQuery({
        limit: 1000,
        cursor: 1,
        query: {
            sortBy: "random",
        },
    });
    (0, react_1.useEffect)(() => {
        if (!data?.items || data.items.length === 0)
            return;
        const allProducts = data.items;
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setSelectedDrakter(selected);
    }, [data]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-[65%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex gap-6", children: selectedDrakter.map((product, index) => {
                    const rotation = [-12, -4, 4, 12][index] ?? 0;
                    const imageField = product.images?.[0]?.image;
                    const imageUrl = typeof imageField === "string"
                        ? imageField
                        : (imageField?.url ?? "");
                    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/product/${product.slug ?? product.id}`, children: (0, jsx_runtime_1.jsxs)("div", { className: `w-52 h-72 rounded-2xl bg-white shadow-2xl p-3 flex flex-col justify-between items-center transition-transform duration-300 hover:scale-105`, style: { transform: `rotate(${rotation}deg)` }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-[200px] flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-white/60 blur-sm rounded-xl z-0" }), imageUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { src: imageUrl, alt: product.name, width: 200, height: 200, className: "relative z-10 object-contain rounded" }))] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs mt-2 text-center font-semibold text-black", children: product.name })] }) }, product.id));
                }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-44 sm:mt-28 md:mt-32 lg:mt-36 px-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-base sm:text-lg md:text-xl lg:text-2xl font-cinzel italic text-gray-900 font-bold", children: "For deg som vet at fotballdrakter er mer enn bare kl\u00E6r." }) })] }));
};
exports.default = HeroDraktDisplay;
