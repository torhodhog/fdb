"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewport = exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const google_1 = require("next/font/google");
require("./globals.css");
const utils_1 = require("@/lib/utils");
const Navbar_1 = __importDefault(require("@/components/Navbar"));
const Providers_1 = __importDefault(require("@/components/Providers"));
const Footer_1 = __importDefault(require("@/components/Footer"));
const sonner_1 = require("sonner");
const theme_provider_1 = require("@/components/theme-provider");
const StripeComponent_1 = __importDefault(require("@/components/StripeComponent")); // Importer stripe komponenten
const Assistant_1 = __importDefault(require("@/components/Assistant"));
require("@/lib/error-handler"); // Import error handler to register global handlers
const inter = (0, google_1.Inter)({ subsets: ["latin"] });
exports.metadata = {
    title: "Fotballdraktbutikken AS",
    description: "Fdb.343",
    manifest: "/manifest.json",
};
exports.viewport = {
    themeColor: "#000000",
};
function RootLayout({ children, }) {
    return ((0, jsx_runtime_1.jsxs)("html", { lang: "en", className: "h-full", children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("link", { rel: "manifest", href: "/manifest.json" }), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
                        } })] }), (0, jsx_runtime_1.jsx)("body", { className: (0, utils_1.cn)("relative h-full font-sans antialiased dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]", inter.className), children: (0, jsx_runtime_1.jsxs)(theme_provider_1.ThemeProvider, { attribute: "class", defaultTheme: "light", children: [(0, jsx_runtime_1.jsx)("main", { className: "relative flex flex-col h-screen", children: (0, jsx_runtime_1.jsxs)(Providers_1.default, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsx)(StripeComponent_1.default, {}), " ", (0, jsx_runtime_1.jsx)(Assistant_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow flex-1", children: children }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }) }), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, { position: "top-center", richColors: true })] }) })] }));
}
