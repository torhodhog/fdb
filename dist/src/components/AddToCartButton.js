"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("./ui/button");
const use_cart_1 = require("@/hooks/use-cart");
const AddToCartButton = ({ product }) => {
    const { addItem } = (0, use_cart_1.useCart)();
    const [isSuccess, setIsSuccess] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [isSuccess]);
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => {
            if (!product.isSold) {
                addItem(product);
                setIsSuccess(true);
            }
        }, size: "lg", className: `w-full ${product.isSold ? 'bg-gray-500' : 'bg-blue-500'}`, disabled: product.isSold, children: product.isSold ? "Solgt" : isSuccess ? "Puttet i handlekurven" : "Legg til i handlekurven" }));
};
exports.default = AddToCartButton;
