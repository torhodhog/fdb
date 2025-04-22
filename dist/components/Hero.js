"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const HeroImage_1 = __importDefault(require("./HeroImage"));
const TextHoverEffectDemo_1 = require("./TextHoverEffectDemo");
const Hero = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex lg:flex-row flex-col-reverse lg:h-auto h-[auto]", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:block hidden", children: (0, jsx_runtime_1.jsx)(TextHoverEffectDemo_1.TextHoverEffectDemo, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "relative w-full  flex-col items-center justify-center lg:hidden block", children: (0, jsx_runtime_1.jsx)(HeroImage_1.default, {}) })] }));
};
exports.default = Hero;
