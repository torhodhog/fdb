"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const react_1 = require("react");
const client_1 = require("@/trpc/client");
const HeroImage = () => {
    const [selectedProducts, setSelectedProducts] = (0, react_1.useState)([]);
    const { data } = client_1.trpc.getInfiniteProducts.useQuery({
        limit: 50,
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
        const selected = shuffled.slice(0, 3);
        setSelectedProducts(selected);
    }, [data]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative bg-white py-16 lg:py-20", children: [(0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid lg:grid-cols-2 gap-12 items-center w-full", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "text-center lg:text-left", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, children: "Norges beste fotballdraktbutikk" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.h1, { className: "text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.3 }, children: ["Dine", " ", (0, jsx_runtime_1.jsx)("span", { className: "bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent", children: "fotball" }), (0, jsx_runtime_1.jsx)("br", {}), "dr\u00F8mmer"] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.p, { className: "text-xl text-gray-600 mb-8 max-w-lg", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, children: "Opplev f\u00F8lelsen av \u00E5 v\u00E6re en del av laget. Originale drakter fra verdens beste klubber." }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.6 }, children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", className: "group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105", children: "\uD83C\uDFDF\uFE0F Utforsk drakter" }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/Sale", className: "relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 border-2 border-green-600 rounded-2xl hover:bg-green-50 transition-all duration-300 hover:scale-105", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full", children: "SALG" }), "\uD83D\uDD25 Opptil 50% rabatt"] })] })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "relative", initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.4 }, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative h-[400px] lg:h-[450px]", children: [selectedProducts.map((product, index) => {
                                        const positions = [
                                            { top: '0', left: '0' },
                                            { top: '8px', right: '0' },
                                            { bottom: '0', left: '50%', transform: 'translateX(-50%)' }
                                        ];
                                        const animations = [
                                            { y: [0, -8, 0], rotate: [0, 1, 0] },
                                            { y: [0, 8, 0], rotate: [0, -1, 0] },
                                            { y: [0, -5, 0], scale: [1, 1.02, 1] }
                                        ];
                                        const delays = [0, 2, 1];
                                        const imageField = product.images?.[0]?.image;
                                        const imageUrl = typeof imageField === "string"
                                            ? imageField
                                            : (imageField?.url ?? "");
                                        return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "absolute w-40 lg:w-48 bg-white rounded-2xl shadow-xl border p-4", style: positions[index], animate: animations[index], transition: {
                                                duration: index === 2 ? 3 : 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: delays[index]
                                            }, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: `/product/${product.id}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-28 lg:h-32 rounded-xl mb-3 overflow-hidden bg-gray-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: imageUrl, alt: product.name, width: 200, height: 128, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl" })) }), (0, jsx_runtime_1.jsx)("h3", { className: "text-gray-900 font-semibold text-sm mb-1 truncate", children: product.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-500 text-xs", children: [product.liga_system || 'Fotballdrakt', " \u2022 ", product.size] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-green-600 text-lg font-bold", children: product.onSale && product.salePrice
                                                            ? `${product.salePrice} kr`
                                                            : `${product.price} kr` })] }) }, product.id));
                                    }), selectedProducts.length === 0 && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "absolute top-0 left-0 w-40 lg:w-48 bg-white rounded-2xl shadow-xl border p-4", animate: {
                                                y: [0, -8, 0],
                                                rotate: [0, 1, 0]
                                            }, transition: {
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-28 lg:h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-3" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-gray-900 font-semibold text-sm mb-1", children: "Laster produkter..." }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-xs", children: "Fotballdrakt" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-green-600 text-lg font-bold", children: "-- kr" })] }) }))] }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-0 left-0 right-0", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 1440 120", className: "w-full h-20 fill-white", children: (0, jsx_runtime_1.jsx)("path", { d: "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" }) }) })] }));
};
exports.default = HeroImage;
