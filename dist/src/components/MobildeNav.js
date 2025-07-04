"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const InstallAppButton_1 = __importDefault(require("./InstallAppButton"));
const MobileNav = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const isLoggedIn = Boolean(user);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "lg:hidden", children: [" ", (0, jsx_runtime_1.jsx)("div", { className: "fixed top-0 w-full bg-white bg-opacity-95 z-[60] shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center px-4 py-4 text-black min-h-[60px]", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "flex items-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Home, { className: "h-6 w-6" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(InstallAppButton_1.default, {}), (0, jsx_runtime_1.jsx)("button", { onClick: toggleMenu, className: "text-black p-2 rounded-lg hover:bg-gray-100 transition-colors", "aria-label": "\u00C5pne meny", children: isMenuOpen ? ((0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-6 w-6" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-6 w-6" })) })] })] }) }), isMenuOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 bg-gray-800 bg-opacity-75 z-[55] flex flex-col justify-center items-center space-y-6 text-white", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", onClick: toggleMenu, className: "text-xl", children: "Hjem" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", onClick: toggleMenu, className: "text-xl", children: "Produkter" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/Sale", onClick: toggleMenu, className: "text-xl", children: "Tilbud" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/contact", onClick: toggleMenu, className: "text-xl", children: "Kontakt oss" }), isLoggedIn ? ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/cart", onClick: toggleMenu, className: "text-xl", children: "Handlekurv" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-in", onClick: toggleMenu, className: "text-xl", children: "Logg inn" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-up", onClick: toggleMenu, className: "text-xl", children: "Opprett konto" })] }))] }))] }));
};
exports.default = MobileNav;
