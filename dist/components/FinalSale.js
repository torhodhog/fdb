"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// ResponsiveImage.tsx
const image_1 = __importDefault(require("next/image"));
const FinalSale = ({ src, alt }) => ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full h-[32vh]", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: src, alt: alt, layout: "fill", objectFit: "contain", className: "absolute top-0 left-0 w-full h-full", width: 1920, height: 1080 }) }));
exports.default = FinalSale;
