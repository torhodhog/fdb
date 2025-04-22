"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@/trpc/client");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const button_1 = require("./ui/button");
const VerifyEmail = ({ token }) => {
    const { data, isLoading, isError } = client_1.trpc.auth.verifyEmail.useQuery({
        token,
    });
    if (isError) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col items-center gap-2', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: 'h-8 w-8 text-red-600' }), (0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-xl', children: "There was a problem" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-muted-foreground text-sm', children: "This token is not valid or might be expired. Please try again." })] }));
    }
    if (data?.success) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex h-full flex-col items-center justify-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'relative mb-4 h-60 w-60 text-muted-foreground', children: (0, jsx_runtime_1.jsx)(image_1.default, { src: '/hippo-email-sent.png', fill: true, alt: 'the email was sent' }) }), (0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-2xl', children: "You're all set!" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-muted-foreground text-center mt-1', children: "Thank you for verifying your email." }), (0, jsx_runtime_1.jsx)(link_1.default, { className: (0, button_1.buttonVariants)({ className: 'mt-4' }), href: '/sign-in', children: "Sign in" })] }));
    }
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col items-center gap-2', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: 'animate-spin h-8 w-8 text-zinc-300' }), (0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-xl', children: "Verifying..." }), (0, jsx_runtime_1.jsx)("p", { className: 'text-muted-foreground text-sm', children: "This won't take long." })] }));
    }
};
exports.default = VerifyEmail;
