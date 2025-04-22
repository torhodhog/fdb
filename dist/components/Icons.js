"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
exports.Icons = {
    logo: (props) => ((0, jsx_runtime_1.jsx)(image_1.default, { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/Full+logo.PNG", alt: "Logo", width: 100, height: 30, priority: true, style: { width: 'auto', height: 'auto' } })),
};
