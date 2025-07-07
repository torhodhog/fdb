"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const InstallAppButton = () => {
    const [installPrompt, setInstallPrompt] = (0, react_1.useState)(null);
    const [isInstalled, setIsInstalled] = (0, react_1.useState)(false);
    const [isStandalone, setIsStandalone] = (0, react_1.useState)(false);
    const [showIOSInstructions, setShowIOSInstructions] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // Only run on client side
        if (typeof window === 'undefined')
            return;
        // Sjekk om appen allerede er installert
        const checkIfStandalone = () => {
            const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
            const isIosStandalone = window.navigator.standalone === true;
            setIsStandalone(isStandaloneMode || isIosStandalone);
        };
        checkIfStandalone();
        // Lytt etter install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e);
        };
        // Lytt etter appen blir installert
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setInstallPrompt(null);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);
    const handleInstallClick = async () => {
        if (!installPrompt)
            return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setIsInstalled(true);
        }
        setInstallPrompt(null);
    };
    // Vis ikke knappen hvis appen allerede kjører som standalone
    if (isStandalone)
        return null;
    // Vis suksess-melding hvis nettopp installert
    if (isInstalled) {
        return ((0, jsx_runtime_1.jsxs)("button", { className: "flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-800 rounded-lg cursor-default", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "App installert!" })] }));
    }
    // Vis installasjon-knapp hvis tilgjengelig
    if (installPrompt) {
        return ((0, jsx_runtime_1.jsxs)("button", { onClick: handleInstallClick, className: "flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", title: "Installer appen p\u00E5 enheten din", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "Installer app" })] }));
    }
    // Fallback for iOS Safari (som ikke støtter installPrompt)
    if (typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setShowIOSInstructions(!showIOSInstructions), className: "flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors", title: "Se hvordan du installerer p\u00E5 iOS", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Smartphone, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "Installer" })] }), showIOSInstructions && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 w-64 text-sm text-gray-700", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-semibold mb-2", children: "Installer p\u00E5 iOS:" }), (0, jsx_runtime_1.jsxs)("ol", { className: "list-decimal list-inside space-y-1", children: [(0, jsx_runtime_1.jsx)("li", { children: "Trykk Del-knappen (\u2B06\uFE0F) nederst" }), (0, jsx_runtime_1.jsx)("li", { children: "Scroll ned og velg \"Legg til p\u00E5 hjemmeskjermen\"" }), (0, jsx_runtime_1.jsx)("li", { children: "Trykk \"Legg til\" \u00F8verst til h\u00F8yre" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setShowIOSInstructions(false), className: "mt-3 text-blue-600 hover:text-blue-800 text-xs", children: "Lukk" })] }))] }));
    }
    // Vis alltid en knapp for testing (i utviklingsmodus)
    if (process.env.NODE_ENV === 'development') {
        return ((0, jsx_runtime_1.jsxs)("button", { className: "flex items-center gap-2 px-3 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors", title: "PWA ikke tilgjengelig i dev-mode", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "Installer (dev)" })] }));
    }
    // Ingen knapp hvis ikke støttet
    return null;
};
exports.default = InstallAppButton;
