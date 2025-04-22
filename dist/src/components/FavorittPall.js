"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FavorittPall;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function FavorittPall() {
    const [produkter, setProdukter] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const hentFavoritter = async () => {
            const res = await fetch('/api/top-favoritter');
            const data = await res.json();
            setProdukter(data);
        };
        hentFavoritter();
    }, []);
    if (produkter.length === 0) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Ingen favoritter enda..." });
    }
    const visningsRekkefølge = [1, 0, 2]; // sølv, gull, bronse
    const høyder = ['h-56', 'h-64', 'h-52']; // gull i midten
    const farger = ['bg-gray-300', 'bg-yellow-300', 'bg-amber-700'];
    const medaljer = ['🥈', '🥇', '🥉'];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-14 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-6", children: "Folkets mest elskede drakter" }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-end gap-6", children: visningsRekkefølge.map((pos, index) => {
                    const produkt = produkter[pos];
                    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex flex-col items-center justify-between p-4 rounded-xl shadow-lg w-44 relative transition-transform hover:scale-105 ${høyder[index]} ${farger[index]}`, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl absolute top-2 left-2", children: medaljer[index] }), index === 1 && ((0, jsx_runtime_1.jsx)("span", { className: "absolute -top-5 text-3xl animate-bounce", children: "\uD83D\uDC51" })), (0, jsx_runtime_1.jsx)("img", { src: produkt.images?.[0]?.image?.url || '/placeholder.jpg', alt: produkt.name, className: "w-24 h-24 object-contain rounded-md border border-white shadow mb-2" }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm font-semibold", children: produkt.name }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-700", children: [produkt.favorites, " \u2764\uFE0F"] })] }, produkt.id));
                }) })] }));
}
