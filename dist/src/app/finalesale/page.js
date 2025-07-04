"use strict";
// FinalSalePage.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MaxWidthWrapper_1 = __importDefault(require("@/components/MaxWidthWrapper"));
const ProductReel_1 = __importDefault(require("@/components/ProductReel"));
const config_1 = require("@/config");
const react_1 = require("react");
const parse = (param) => {
    return typeof param === "string" ? param : undefined;
};
const FinalSalePage = ({ searchParams }) => {
    const sort = parse(searchParams.sort);
    const category = parse(searchParams.category);
    const label = config_1.PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [ligaSystem, setLigaSystem] = (0, react_1.useState)("");
    const [size, setSize] = (0, react_1.useState)("");
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [productName, setProductName] = (0, react_1.useState)(""); // New state for product name
    const itemsPerPage = 16;
    const handleSearch = () => {
        setCurrentPage(1);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { children: (0, jsx_runtime_1.jsx)(ProductReel_1.default, { title: label ?? "CHAMPIONS LEAGUE", query: {
                    category,
                    sort: sort === "desc" || sort === "asc" ? sort : undefined,
                    searchTerm: searchTerm,
                    liga_system: ligaSystem,
                    size: size,
                    finalSale: true, // viser kun produkter med finalSale
                    limit: itemsPerPage,
                } }) }) }));
};
exports.default = FinalSalePage;
