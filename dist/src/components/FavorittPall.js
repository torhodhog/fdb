"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FavorittTabell;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function FavorittTabell() {
    const [produkter, setProdukter] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const hentFavoritter = async () => {
            const res = await fetch('/api/top-favoritter');
            const data = await res.json();
            setProdukter(data.slice(0, 10)); // Bare topp 10
        };
        hentFavoritter();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-20", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-extrabold text-center mb-8 tracking-tight text-green-900", children: "Draktligaen" }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-md overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-12 bg-green-900 text-white text-xs sm:text-sm font-semibold text-left", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-1 px-2 py-3 text-center", children: "#" }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-9 px-4 py-3", children: "Drakt" }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-2 px-2 py-3 text-center", children: "\u2764\uFE0F" })] }), produkter.map((produkt, index) => {
                        const forrige = produkt.previousRank ?? index;
                        const differanse = forrige - index;
                        return ((0, jsx_runtime_1.jsxs)("div", { className: `grid grid-cols-12 items-center text-xs sm:text-sm border-t border-gray-200 hover:bg-gray-50 transition`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "col-span-1 px-2 py-3 text-center font-bold text-green-800", children: [index + 1, index === 0 && ((0, jsx_runtime_1.jsx)("span", { className: "ml-1", children: "\uD83D\uDC51" }))] }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-9 px-4 py-3 text-gray-800 truncate", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/product/${produkt.slug ?? produkt.id}`, className: "hover:underline text-blue-700", children: produkt.name }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-2 px-2 py-3 text-center flex items-center justify-center gap-1 font-semibold text-gray-700", children: [produkt.favorites, differanse > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "text-green-500 text-lg", children: "\u25B2" })), differanse < 0 && ((0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-lg", children: "\u25BC" }))] })] }, produkt.id));
                    })] })] }));
}
