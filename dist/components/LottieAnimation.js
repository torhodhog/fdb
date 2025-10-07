"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// Lightweight CSS-only loading animation instead of heavy Lottie
const LottieAnimation = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-[400px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-spin", children: (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-2 bg-white rounded-full flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-2 h-8 bg-gray-800 rounded-full" }), (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-2 bg-gray-800 rounded-full absolute" })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-center mt-4 text-gray-600 font-medium", children: "Laster drakter..." })] }) }));
};
exports.default = LottieAnimation;
