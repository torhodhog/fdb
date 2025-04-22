"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// Info.tsx
const image_1 = __importDefault(require("next/image"));
const Info = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full h-[600px] mt-8", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/saftey.jpeg", style: { objectFit: 'cover', width: '100%', height: '100%' }, alt: "Info", width: 1920, height: 1080 }) }));
};
exports.default = Info;
