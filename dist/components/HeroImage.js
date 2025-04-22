"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const HeroVideo_1 = __importDefault(require("./HeroVideo"));
const HeroImage = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-[600px] bg-white", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-[0%] left-1/2 transform -translate-x-1/2 w-[500px] z-30 pointer-events-none block md:hidden", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/paraply-Photoroom-bakgrunn+fjernet.png", alt: "Hero paraply", width: 500, height: 300, style: {
                        opacity: 0.85,
                        filter: "blur(0px)",
                    }, priority: true }) }), (0, jsx_runtime_1.jsx)(HeroVideo_1.default, {})] }));
};
exports.default = HeroImage;
