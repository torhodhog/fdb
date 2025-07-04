"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MaxWidthWrapper_1 = __importDefault(require("@/components/MaxWidthWrapper"));
const ProductReel_1 = __importDefault(require("@/components/ProductReel"));
const react_1 = require("react");
const SalePage = () => {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [ligaSystem, setLigaSystem] = (0, react_1.useState)("");
    const [size, setSize] = (0, react_1.useState)("");
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { children: (0, jsx_runtime_1.jsx)(ProductReel_1.default, { title: "Salg", href: "/Sale", query: {
                    limit: 1000,
                    searchTerm: searchTerm,
                    liga_system: ligaSystem,
                    size: size,
                    onSale: true, // Legg til onSale parameter
                }, loadMore: true, showSaleItems: true }) }) }));
};
exports.default = SalePage;
