"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const VerifyEmail_1 = __importDefault(require("@/components/VerifyEmail"));
const image_1 = __importDefault(require("next/image"));
const VerifyEmailPage = ({ searchParams }) => {
    const token = searchParams.token;
    const toEmail = searchParams.to;
    return ((0, jsx_runtime_1.jsx)("div", { className: "container relative flex pt-20 flex-col items-center justify-center lg:px-0", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]", children: token && typeof token === "string" ? ((0, jsx_runtime_1.jsx)("div", { className: "grid gap-6", children: (0, jsx_runtime_1.jsx)(VerifyEmail_1.default, { token: token }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full flex-col items-center justify-center space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative mb-4 h-60 w-60 text-muted-foreground", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/logo.png", fill: true, alt: "logo" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-2xl text-center", children: "Sjekk mailen" }), toEmail ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-muted-foreground text-center", children: ["Vi har sendt en verifikasjonsmail til", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: toEmail }), "."] })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-center", children: "Vi har sendt en verifikasjonsmail til din mail." })), (0, jsx_runtime_1.jsx)("p", { className: "text-center flex pt-8", children: "Finner du den ikke? Sjekk s\u00F8ppelpost, eller ta kontakt med oss" })] })) }) }));
};
exports.default = VerifyEmailPage;
