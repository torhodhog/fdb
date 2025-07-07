"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientSearchbarWrapper;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const Searchbar_1 = __importDefault(require("./Searchbar"));
function ClientSearchbarWrapper() {
    const pathname = (0, navigation_1.usePathname)();
    if (pathname === "/products")
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "mt-16 mb-1 md:mt-0", children: (0, jsx_runtime_1.jsx)(Searchbar_1.default, {}) }));
}
