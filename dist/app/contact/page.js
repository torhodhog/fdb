"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Contact;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const browser_1 = __importDefault(require("@emailjs/browser"));
const sonner_1 = require("sonner"); // Importerer toast fra sonner, antar at biblioteket eksporterer en funksjon kalt toast
function Contact() {
    const form = (0, react_1.useRef)(null);
    const [formState, setFormState] = (0, react_1.useState)({
        user_email: '',
        user_name: '',
        message: '',
    });
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };
    const resetForm = () => {
        setFormState({
            user_email: '',
            user_name: '',
            message: '',
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.current) {
            browser_1.default
                .sendForm('service_6lo1mcj', 'template_xu5g40h', form.current, 'TgOIRuM_0f-3pFshq')
                .then(() => {
                sonner_1.toast.success('Melding sendt uten problemer!');
                resetForm();
            }, (error) => {
                sonner_1.toast.error('Failed to send email: ' + error.text);
                console.error('Failed to send email', error.text);
            });
        }
        else {
            console.error('Form reference is null');
            sonner_1.toast.error('Form reference is not available');
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("form", { ref: form, onSubmit: handleSubmit, className: "flex flex-col mb-28 mt-28 items-center justify-center w-full max-w-lg mx-auto p-12 bg-gray-800 shadow-xl rounded-lg space-y-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-white", children: "Vi \u00F8nsker \u00E5 h\u00F8re fra deg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "frm-email", className: "text-gray-300", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { id: "frm-email", type: "email", name: "user_email", value: formState.user_email, className: "p-2 rounded bg-gray-700 text-white border border-gray-600", required: true, onChange: handleChange })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "frm-first", className: "text-gray-300", children: "Navn" }), (0, jsx_runtime_1.jsx)("input", { id: "frm-first", type: "text", name: "user_name", value: formState.user_name, className: "p-2 rounded bg-gray-700 text-white border border-gray-600", required: true, onChange: handleChange })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "frm-message", className: "text-gray-300", children: "Melding" }), (0, jsx_runtime_1.jsx)("textarea", { id: "frm-message", name: "message", value: formState.message, className: "p-2 rounded bg-gray-700 text-white border border-gray-600", onChange: handleChange })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300", children: "Send" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center flex-col gap-y-3 mb-8", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faMapMarkerAlt, color: "green" }), " Strandgaten 74, 5004 Bergen"] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope, color: "green" }), " Mail: fdb@fotballdraktbutikken.no"] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPhone, color: "green" }), " Telefon: +47 979 39 973"] })] })] }));
}
