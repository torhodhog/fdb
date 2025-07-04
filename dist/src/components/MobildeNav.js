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
const Cart_1 = __importDefault(require("./Cart"));
const client_1 = require("@/trpc/client");
const use_auth_1 = require("@/hooks/use-auth");
const MobileNav = ({ user: initialUser }) => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const { signOut } = (0, use_auth_1.useAuth)();
    // Hent brukerinfo fra tRPC for å få oppdateringer
    const { data: meData } = client_1.trpc.auth.getMe.useQuery();
    const currentUser = meData?.user || initialUser;
    const isLoggedIn = Boolean(currentUser);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "lg:hidden", children: [" ", (0, jsx_runtime_1.jsx)("div", { className: "fixed  top-0 w-full bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 z-[60] shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-1 py-3 text-black dark:text-white min-h-[56px]", children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleMenu, className: "text-black dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", "aria-label": "\u00C5pne meny", children: isMenuOpen ? ((0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-6 w-6" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { className: "h-6 w-6" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1 mr-10", children: [(0, jsx_runtime_1.jsx)(Cart_1.default, {}), (0, jsx_runtime_1.jsx)(InstallAppButton_1.default, {})] })] }) }), isMenuOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 bg-gray-800 bg-opacity-75 z-[55] flex flex-col justify-center items-center space-y-6 text-white", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", onClick: toggleMenu, className: "text-xl", children: "Hjem" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/products", onClick: toggleMenu, className: "text-xl", children: "Produkter" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/Sale", onClick: toggleMenu, className: "text-xl", children: "Tilbud" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/contact", onClick: toggleMenu, className: "text-xl", children: "Kontakt oss" }), isLoggedIn ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/cart", onClick: toggleMenu, className: "text-xl", children: "Handlekurv" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                    signOut();
                                    toggleMenu();
                                }, className: "text-xl", children: "Logg ut" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-in", onClick: toggleMenu, className: "text-xl", children: "Logg inn" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-up", onClick: toggleMenu, className: "text-xl", children: "Opprett konto" })] }))] }))] }));
};
exports.default = MobileNav;
