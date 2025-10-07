"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@/lib/utils");
const MaxWidthWrapper = ({ className, children, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("mx-auto w-full max-w-screen-xl px-3 sm:px-6 md:px-10 lg:px-20", className), children: children }));
};
exports.default = MaxWidthWrapper;
