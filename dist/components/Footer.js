"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const MaxWidthWrapper_1 = __importDefault(require("./MaxWidthWrapper"));
const Icons_1 = require("./Icons");
const link_1 = __importDefault(require("next/link"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
const PopupNewsletter_1 = __importDefault(require("./PopupNewsletter"));
const Footer = () => {
    const pathname = (0, navigation_1.usePathname)() ?? "";
    const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"];
    // Nyhetsbrev state og funksjoner
    const [email, setEmail] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    const handleSubscribe = async () => {
        if (!email) {
            setMessage("Vennligst skriv inn en gyldig e-postadresse.");
            return;
        }
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setMessage("Takk for at du meldte deg på nyhetsbrevet!");
                setEmail(""); // Tøm inputfeltet
                // Fjern meldingen etter 5 sekunder
                setTimeout(() => {
                    setMessage("");
                }, 5000); // 5000 millisekunder = 5 sekunder
            }
            else {
                setMessage("Noe gikk galt. Vennligst prøv igjen.");
            }
        }
        catch (error) {
            setMessage("Noe gikk galt. Vennligst prøv igjen.");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("footer", { className: "bg-white flex-grow-0", children: [(0, jsx_runtime_1.jsxs)(MaxWidthWrapper_1.default, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "border-t border-gray-200", children: [pathsToMinimize.includes(pathname ?? "") ? null : ((0, jsx_runtime_1.jsx)("div", { className: "pb-8 pt-16", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(Icons_1.Icons.logo, { className: "h-12 w-auto" }) }) })), pathsToMinimize.includes(pathname) ? null : ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center px-6 py-6 sm:py-8 lg:mt-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 overflow-hidden rounded-lg", children: (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute inset-0 bg-gradient-to-br bg-opacity-90" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center relative mx-auto max-w-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-gray-900", children: "F\u00F8lg oss" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-muted-foreground", children: "via sosiale medier." }), (0, jsx_runtime_1.jsxs)("div", { className: "space-x-8 mt-8", children: [(0, jsx_runtime_1.jsx)("a", { href: "https://www.tiktok.com/@fdb343", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { className: "text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black", icon: free_brands_svg_icons_1.faTiktok, size: "2x" }) }), (0, jsx_runtime_1.jsx)("a", { href: "https://www.facebook.com/fotballdraktbutikken", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { className: "text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black", icon: free_brands_svg_icons_1.faFacebook, size: "2x" }) }), (0, jsx_runtime_1.jsx)("a", { href: "https://www.instagram.com/fdb.343/", target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { className: "text-black hover:text-rose-600 dark:text-rose-600 dark:hover:text-black", icon: free_brands_svg_icons_1.faInstagram, size: "2x" }) })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-sm text-muted-foreground", children: "F\u00F8lg oss for \u00E5 holde deg oppdatert p\u00E5 nyheter og tilbud." }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-8", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Skriv inn e-postadresse", className: "p-2 border rounded-md w-full" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSubscribe, className: "mt-2 bg-yellow-400 text-white py-2 px-4 rounded hover:bg-blue-600", children: "Meld deg p\u00E5" }), message && (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-gray-700", children: message })] })] })] }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "py-10 md:flex md:items-center md:justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-center md:text-left", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " All Rights Reserved"] }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 flex items-center justify-center md:mt-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-8", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/terms", className: "text-sm text-muted-foreground hover:text-gray-600", children: "Terms" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "#", className: "text-sm text-muted-foreground hover:text-gray-600", children: "Privacy Policy" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "#", className: "text-sm text-muted-foreground hover:text-gray-600", children: "Cookie Policy" })] }) })] })] }), (0, jsx_runtime_1.jsx)(PopupNewsletter_1.default, {})] }));
};
exports.default = Footer;
