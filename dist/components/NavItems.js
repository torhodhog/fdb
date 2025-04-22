"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const config_1 = require("@/config");
const use_on_click_outside_1 = require("@/hooks/use-on-click-outside");
const react_1 = require("react");
const NavItem_1 = __importDefault(require("./NavItem"));
const NavItems = () => {
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const handler = (e) => {
            if (e.key === "Escape") {
                setActiveIndex(null);
            }
        };
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, []);
    const isAnyOpen = activeIndex !== null;
    const navRef = (0, react_1.useRef)(null);
    (0, use_on_click_outside_1.useOnClickOutside)(navRef, () => setActiveIndex(null));
    return ((0, jsx_runtime_1.jsx)("div", { id: "nav-items-container", className: "flex gap-4 h-full", ref: navRef, children: config_1.PRODUCT_CATEGORIES.map((category, i) => {
            const handleOpen = () => {
                if (activeIndex === i) {
                    setActiveIndex(null);
                }
                else {
                    setActiveIndex(i);
                }
            };
            const close = () => setActiveIndex(null);
            const isOpen = i === activeIndex;
            return ((0, jsx_runtime_1.jsx)(NavItem_1.default, { category: category, close: close, handleOpen: handleOpen, isOpen: isOpen, isAnyOpen: isAnyOpen }, category.value));
        }) }));
};
exports.default = NavItems;
