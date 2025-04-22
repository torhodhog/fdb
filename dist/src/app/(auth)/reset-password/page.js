"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const sonner_1 = require("sonner");
const navigation_1 = require("next/navigation");
const ResetPasswordPage = () => {
    const [password, setPassword] = (0, react_1.useState)("");
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const searchParams = (0, navigation_1.useSearchParams)();
    const token = searchParams ? searchParams.get("token") : null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            sonner_1.toast.error("Passordene samsvarer ikke.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("/api/users/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });
            if (!response.ok) {
                throw new Error("Noe gikk galt. Prøv igjen senere.");
            }
            sonner_1.toast.success("Passordet ditt er oppdatert.");
            setPassword("");
            setConfirmPassword("");
        }
        catch (error) {
            sonner_1.toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container flex flex-col items-center justify-center min-h-screen", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold mb-4", children: "Tilbakestill passord" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "w-full max-w-md space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "Nytt passord" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Nytt passord", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "confirmPassword", children: "Bekreft passord" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Bekreft passord", required: true })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading, className: "w-full", children: isLoading ? "Oppdaterer..." : "Oppdater passord" })] })] }));
};
exports.default = ResetPasswordPage;
