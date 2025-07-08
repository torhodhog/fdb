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
const use_auth_1 = require("@/hooks/use-auth");
const use_cart_1 = require("@/hooks/use-cart");
const MobileNav = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const isLoggedIn = Boolean(user);
    const { signOut } = (0, use_auth_1.useAuth)();
    const { items } = (0, use_cart_1.useCart)();
    const itemCount = isMounted ? items.length : 0;
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 lg:hidden w-full bg-white z-50 shadow-sm border-b border-gray-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center px-4 py-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleMenu, className: "text-gray-700 hover:text-gray-900 transition-colors", "aria-label": "Menu", children: isMenuOpen ? ((0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-6 w-6" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-6 w-6" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: "/cart", className: "relative text-gray-700 hover:text-gray-900 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShoppingCart, { className: "h-6 w-6" }), isMounted && itemCount > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold", children: itemCount }))] }), (0, jsx_runtime_1.jsx)(InstallAppButton_1.default, {})] })] }) }), isMenuOpen && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-gray-900 bg-opacity-95 z-40 lg:hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center h-full space-y-8 text-white", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Hjem" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Produkter" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/Sale", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Tilbud" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/contact", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Kontakt oss" }), isLoggedIn ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/cart", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Handlekurv" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                        signOut();
                                        toggleMenu();
                                    }, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Logg ut" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-in", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Logg inn" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-up", onClick: toggleMenu, className: "text-2xl font-medium hover:text-gray-300 transition-colors", children: "Opprett konto" })] }))] }) }))] }));
};
exports.default = MobileNav;
