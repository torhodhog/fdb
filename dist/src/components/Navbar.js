"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
// Importer next/image for å vise flagg
const Cart_1 = __importDefault(require("./Cart"));
const Icons_1 = require("./Icons");
const MaxWidthWrapper_1 = __importDefault(require("./MaxWidthWrapper"));
const MobildeNav_1 = __importDefault(require("./MobildeNav"));
// Sørg for at importen er korrekt her
const ModeToggle_1 = require("./ModeToggle");
const NavItems_1 = __importDefault(require("./NavItems"));
const ClientSearchbarWrapper_1 = __importDefault(require("./ClientSearchbarWrapper"));
const button_1 = require("./ui/button");
const UserAccountNav_1 = __importDefault(require("./UserAccountNav"));
const InstallAppButton_1 = __importDefault(require("./InstallAppButton"));
const client_1 = require("@/trpc/client");
const Navbar = () => {
    const { data: userResponse } = client_1.trpc.auth.getMe.useQuery();
    const user = userResponse?.user;
    return ((0, jsx_runtime_1.jsx)("div", { className: "top-0 inset-x-0 z-50 sticky bg-white", children: (0, jsx_runtime_1.jsx)("header", { className: "relative bg-transparent lg:bg-background", children: (0, jsx_runtime_1.jsx)(MaxWidthWrapper_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "border-b border-gray-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-28 items-center", children: [(0, jsx_runtime_1.jsx)(MobildeNav_1.default, { user: user }), (0, jsx_runtime_1.jsx)("div", { className: "ml-4 hidden lg:flex lg:ml-0", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: (0, jsx_runtime_1.jsx)(Icons_1.Icons.logo, { className: "h-8 w-10" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden z-50 lg:ml-8 lg:block lg:self-stretch", children: (0, jsx_runtime_1.jsx)(NavItems_1.default, {}) }), (0, jsx_runtime_1.jsx)(ClientSearchbarWrapper_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto flex items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6", children: [user ? ((0, jsx_runtime_1.jsx)(UserAccountNav_1.default, { user: user })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden lg:flex", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-in", className: (0, button_1.buttonVariants)({
                                                            variant: "ghost",
                                                        }), children: "Logg inn" }) }), (0, jsx_runtime_1.jsx)("span", { className: "h-6 w-px bg-gray-200", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", { className: "hidden lg:flex", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sign-up", className: (0, button_1.buttonVariants)({
                                                            variant: "ghost",
                                                        }), children: "Opprett konto" }) })] })), user && ((0, jsx_runtime_1.jsx)("span", { className: "h-6 w-px bg-gray-200", "aria-hidden": "true" })), (0, jsx_runtime_1.jsxs)("div", { className: "ml-8 hidden lg:flex flex-row flex-auto space-x-4 lg:ml-6", children: [(0, jsx_runtime_1.jsx)(InstallAppButton_1.default, {}), (0, jsx_runtime_1.jsx)(Cart_1.default, {}), (0, jsx_runtime_1.jsx)(ModeToggle_1.ModeToggle, {})] })] }) })] }) }) }) }) }));
};
exports.default = Navbar;
