"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Searchbar;
const jsx_runtime_1 = require("react/jsx-runtime");
// "use client";
const react_1 = require("react");
const client_1 = require("@/trpc/client");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const fa_1 = require("react-icons/fa");
// 1) Debounce-hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}
// Hjelpefunksjon for å hente første bildeadresse
function getFirstImageUrl(product) {
    if (!product.images || product.images.length === 0)
        return null;
    const first = product.images[0];
    if (!first?.image)
        return null;
    if (typeof first.image === "string") {
        return first.image;
    }
    else if ("url" in first.image && first.image.url) {
        return first.image.url;
    }
    return null;
}
function Searchbar() {
    const [term, setTerm] = (0, react_1.useState)("");
    // 2) Debounce selve søketermen
    const debouncedTerm = useDebounce(term, 300);
    // 3) Bare kjør query hvis minst 3 tegn
    const { data, isFetching } = client_1.trpc.searchProducts.useQuery({ term: debouncedTerm }, { enabled: debouncedTerm.trim().length >= 3 });
    const results = data?.docs || [];
    const hasMore = data?.hasMore || false;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "S\u00F8k etter drakt...", value: term, onChange: (e) => setTerm(e.target.value), className: "w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" }), isFetching && ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: (0, jsx_runtime_1.jsx)(fa_1.FaSpinner, { className: "animate-spin text-gray-500" }) }))] }), debouncedTerm.trim().length >= 3 &&
                !isFetching &&
                results.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "\n            absolute \n            left-0 \n            top-full \n            mt-1\n            w-full\n            z-[70]\n            bg-white dark:bg-gray-800\n            rounded-md\n            shadow-lg\n            border border-gray-200 dark:border-gray-600\n            max-h-72        \n            overflow-y-auto \n          ", children: [results.map((product) => {
                        const imageUrl = getFirstImageUrl(product);
                        return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: `/product/${product.id}`, className: "flex items-center p-2 border-b border-gray-200 dark:border-gray-600 last:border-none hover:bg-gray-50 dark:hover:bg-gray-700", onClick: () => setTerm(""), children: [imageUrl && ((0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 relative mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: imageUrl, alt: product.name, fill: true, style: { objectFit: "cover" }, className: "rounded", sizes: "40px" }) })), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: product.name })] }, product.id));
                    }), hasMore && ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/products?searchTerm=${debouncedTerm}`, className: "block p-2 border-t border-gray-200 text-sm text-blue-600 hover:bg-gray-50", onClick: () => setTerm(""), children: "Se alle treff" }))] })), debouncedTerm.trim().length >= 3 &&
                !isFetching &&
                results.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "\n            absolute\n            left-0\n            top-full\n            mt-1\n            w-full\n            z-[70]\n            bg-white dark:bg-gray-800\n            rounded-md\n            shadow-lg\n            border border-gray-200 dark:border-gray-600\n            p-2\n          ", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: "Ingen treff ..." }) }))] }));
}
