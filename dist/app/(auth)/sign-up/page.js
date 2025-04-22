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
const zod_2 = require("zod");
const navigation_1 = require("next/navigation");
const Page = () => {
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(account_credentials_validators_1.AuthCredentialsValidator),
    });
    const router = (0, navigation_1.useRouter)();
    const { mutate, isLoading } = client_1.trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            console.error("Error details:", err);
            if (err.data?.code === "CONFLICT") {
                sonner_1.toast.error("Denne mailen er allerede i bruk, vil du heller logge inn?");
                return;
            }
            if (err instanceof zod_2.ZodError) {
                sonner_1.toast.error(err.issues[0].message);
                return;
            }
            sonner_1.toast.error("Noe gikk galt. Prøv igjen senere");
        },
        onSuccess: ({ sentToEmail }) => {
            sonner_1.toast.success(`Verification email sent to ${sentToEmail}.`);
            router.push("/verify-email?to=" + sentToEmail);
        },
    });
    const onSubmit = ({ email, password, phone, address, country, postalCode }) => {
        console.log("Submitted phone number:", phone);
        mutate({ email, password, phone, address, country, postalCode });
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "container relative flex pt-20 flex-col items-center justify-center lg:px-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-2 text-center", children: [(0, jsx_runtime_1.jsx)(Icons_1.Icons.logo, { className: "h-20 w-20" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold tracking-tight", children: "Lag en konto" }), (0, jsx_runtime_1.jsxs)(link_1.default, { className: (0, button_1.buttonVariants)({
                                    variant: "link",
                                    className: "gap-1.5",
                                }), href: "/sign-in", children: ["Har du allerede en konto? Logg inn", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-6", children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit(onSubmit), children: (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("email"), className: (0, utils_1.cn)({
                                                    "focus-visible:ring-red-500": errors.email,
                                                }), placeholder: "you@example.com" }), errors?.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Telefon" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("phone"), placeholder: "Telefonnummer" }), errors?.phone && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.phone.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "Adresse" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("address"), placeholder: "Adresse" }), errors?.address && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.address.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "postalCode", children: "Postnummer" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("postalCode"), placeholder: "Postnummer" }), errors?.postalCode && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.postalCode.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "country", children: "Land" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("country"), placeholder: "Land" }), errors?.country && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.country.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1 py-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Passord" }), (0, jsx_runtime_1.jsx)(input_1.Input, { ...register("password"), type: "password", className: (0, utils_1.cn)({
                                                    "focus-visible:ring-red-500": errors.password,
                                                }), placeholder: "Passord" }), errors?.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.password.message }))] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading, children: isLoading ? "Laster..." : "Sign up" })] }) }) })] }) }) }));
};
exports.default = Page;
