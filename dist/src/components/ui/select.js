"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Select = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("select", { ...props, children: children }));
};
exports.default = Select;
