"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const sonner_1 = require("sonner");
const ForgotPasswordPage = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error("Noe gikk galt. Prøv igjen senere.");
            }
            sonner_1.toast.success("En e-post med instruksjoner er sendt hvis e-posten er registrert.");
            setEmail("");
        }
        catch (error) {
            sonner_1.toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container flex flex-col items-center justify-center min-h-screen", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold mb-4", children: "Glemt passord" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "w-full max-w-md space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "E-postadresse" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "din@epost.com", required: true })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading, className: "w-full", children: isLoading ? "Sender..." : "Send instruksjoner" })] })] }));
};
exports.default = ForgotPasswordPage;
