"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGridSkeleton = exports.ProductSkeleton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ProductSkeleton = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "animate-pulse", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-gray-200 aspect-square rounded-xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-gray-200 h-4 rounded w-3/4" }), (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-200 h-3 rounded w-1/2" }), (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-200 h-4 rounded w-1/4" })] })] }));
};
exports.ProductSkeleton = ProductSkeleton;
const ProductGridSkeleton = ({ count = 8 }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8", children: Array.from({ length: count }).map((_, i) => ((0, jsx_runtime_1.jsx)(ProductSkeleton, {}, i))) }));
};
exports.ProductGridSkeleton = ProductGridSkeleton;
exports.default = ProductGridSkeleton;
