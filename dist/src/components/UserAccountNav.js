"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("./ui/button");
const dropdown_menu_1 = require("./ui/dropdown-menu");
const link_1 = __importDefault(require("next/link"));
const use_auth_1 = require("@/hooks/use-auth");
const UserAccountNav = ({ user }) => {
    const { signOut } = (0, use_auth_1.useAuth)();
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, className: "overflow-visible", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative group", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", className: "relative font-bold", children: "Min side" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-1/2 -translate-x-1/2 mt-10 w-max px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity", dangerouslySetInnerHTML: {
                                __html: "Her kan du:<br/>- Se dine ordre<br/>- Finne dine favoritter",
                            } })] }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "bg-white w-60", align: "end", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-start gap-2 p-2", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-0.5 leading-none", children: (0, jsx_runtime_1.jsx)("p", { className: "font-medium text-sm text-black", children: user.email }) }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), user.role === 'admin' ? ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sell", children: "Rediger produkter" }) })) : ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/sell", children: "Mine side" }) })), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: signOut, className: "cursor-pointer", children: "Logg ut" })] })] }));
};
exports.default = UserAccountNav;
