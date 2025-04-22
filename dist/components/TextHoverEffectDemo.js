"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHoverEffectDemo = TextHoverEffectDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const text_hover_effect_1 = require("@/components/ui/text-hover.effect");
function TextHoverEffectDemo() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-[40rem] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(text_hover_effect_1.TextHoverEffect, { text: "FDB.343", duration: 2 }) }));
}
