"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Icons_1 = require("@/components/Icons");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const utils_1 = require("@/lib/utils");
const zod_1 = require("@hookform/resolvers/zod");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_hook_form_1 = require("react-hook-form");
const account_credentials_validators_1 = require("@/lib/validators/account-credentials-validators");
const client_1 = require("@/trpc/client");
const sonner_1 = require("sonner");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const SignInContent = () => {
    const searchParams = (0, navigation_1.useSearchParams)() || new URLSearchParams();
    const router = (0, navigation_1.useRouter)();
    const utils = client_1.trpc.useUtils();
    const isSeller = searchParams.get("as") === "seller";
    const origin = searchParams.get("origin");
    const continueAsBuyer = () => {
        router.replace("/sign-in", undefined);
    };
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(account_credentials_validators_1.SignInCredentialsValidator),
    });
    const { mutate: signIn, isLoading } = client_1.trpc.auth.signIn.useMutation({
        onSuccess: async () => {
            sonner_1.toast.success("Logget inn uten feil");
            // Invalidate cache for user data to update navbar
            await utils.auth.getMe.invalidate();
            router.refresh();
            if (origin) {
                router.push(`/${origin}`);
                return;
            }
            router.push("/");
        },
        onError: (err) => {
            if (err.data?.code === "UNAUTHORIZED") {
                sonner_1.toast.error("Feil epost eller passord.");
            }
        },
    });
    const onSubmit = ({ email, password }) => {
        signIn({
            email,
            password,
        });
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "container relative flex pt-20 flex-col items-center justify-center lg:px-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-2 text-center", children: [(0, jsx_runtime_1.jsx)(Icons_1.Icons.logo, { className: "h-20 w-20" }), (0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl font-semibold tracking-tight", children: ["Logg inn p\u00E5 din ", isSeller ? "seller" : "", " konto"] }), (0, jsx_runtime_1.jsxs)(link_1.default, { className: (0, button_1.buttonVariants)({
                                    variant: "link",
                                    className: "gap-1.5 ",
                                }), href: "/sign-up", children: ["Har du ingen konto?", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-6", children: [(0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit(onSubmit), children: (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("email"), className: (0, utils_1.cn)({
                                                        "focus-visible:ring-red-500": errors.email,
                                                    }), placeholder: "din@epost.com" }), errors?.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Passord" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("password"), type: "password", className: (0, utils_1.cn)({
                                                        "focus-visible:ring-red-500": errors.password,
                                                    }), placeholder: "Password" }), errors?.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.password.message }))] }), (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/forgot-password", className: "text-sm text-yellow-800 hover:underline", children: "Glemt passord?" }) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: isLoading, className: "bg-green-800", children: [isLoading && ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" })), "Logg inn"] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute inset-0 flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: "w-full border-t" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center text-xs uppercase", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-background px-2 text-muted-foreground", children: "fdb" }) })] }), isSeller ? ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: continueAsBuyer, variant: "secondary", disabled: isLoading, children: "Fortsett som kj\u00F8per" })) : null] })] }) }) }));
};
const Page = () => {
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), children: (0, jsx_runtime_1.jsx)(SignInContent, {}) }));
};
exports.default = Page;
