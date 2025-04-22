"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const link_1 = __importDefault(require("next/link"));
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const NavItem = ({ isAnyOpen, category, handleOpen, close, isOpen, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex mt-10", children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { open: isOpen, onOpenChange: handleOpen, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-1.5", variant: isOpen ? "secondary" : "ghost", children: [category.label, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: (0, utils_1.cn)("h-4 w-4 transition-all text-muted-foreground", {
                                    "-rotate-180": isOpen,
                                }) })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { className: "w-56", children: category.featured.map((item) => ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onSelect: close, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: item.href, className: "block w-full", children: (0, jsx_runtime_1.jsx)("span", { className: "block font-medium text-gray-900", children: item.name }) }) }, item.name))) })] }) }));
};
exports.default = NavItem;
