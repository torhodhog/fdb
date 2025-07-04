"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Assistant;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Assistant() {
    const [vis, setVis] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const alleredeSett = localStorage.getItem("assistVis");
        if (!alleredeSett) {
            setTimeout(() => {
                setVis(true);
                localStorage.setItem("assistVis", "true");
            }, 2000); // vises etter 2 sek
        }
    }, []);
    if (!vis)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-6 right-6 flex flex-col items-center animate-fadeIn z-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-white shadow-lg rounded-lg p-4 mb-2 max-w-xs", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setVis(false), className: "absolute top-2 right-2 text-gray-400 hover:text-black py-8", children: "\u2716\uFE0F" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-800", children: "Hei! \uD83D\uDC4B N\u00E5 kan du favorittmarkere drakter og f\u00F8lge med p\u00E5 Draktligaen lengre ned p\u00E5 siden! \u26BD\uFE0F\u2764\uFE0F" })] }) }));
}
