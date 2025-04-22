"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const CellHeroImage = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full h-[300px] ", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/EM-hero-edit.jpeg", layout: "fill", objectFit: "contain", alt: "Hero", width: 1920, height: 1080 }) }));
};
exports.default = CellHeroImage;
