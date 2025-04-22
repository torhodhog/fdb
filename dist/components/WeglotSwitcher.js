"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WeglotSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
function WeglotSwitcher() {
    const [weglotLoaded, setWeglotLoaded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.weglot.com/weglot.min.js";
        script.async = true;
        script.onload = () => {
            if (window.Weglot) {
                window.Weglot.initialize({
                    api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'
                });
                console.log("Weglot initialized");
                setWeglotLoaded(true);
            }
            else {
                console.error("Weglot is not available on window");
            }
        };
        document.head.appendChild(script);
        // Skjul den innebygde Weglot-språkvelgeren
        const style = document.createElement("style");
        style.innerHTML = `
      #weglot_language_no, #weglot_language_en {
        display: none !important;
      }
    `;
        document.head.appendChild(style);
    }, []);
    const switchLanguage = (lang) => {
        console.log(`Attempting to switch language to ${lang}`);
        if (weglotLoaded && window.Weglot) {
            window.Weglot.switchTo(lang);
            console.log(`Switched language to ${lang}`);
        }
        else {
            console.error("Weglot is not available on window");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "language-switcher", children: [(0, jsx_runtime_1.jsx)("button", { className: "mr-4 ml-4", onClick: () => switchLanguage('no'), children: (0, jsx_runtime_1.jsx)(image_1.default, { className: "w-8 h-8", src: "/norway-flag.png", alt: "Norwegian Flag", width: 32, height: 32 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => switchLanguage('en'), children: (0, jsx_runtime_1.jsx)(image_1.default, { className: "w-8 h-8", src: "/uk-flag.png", alt: "UK Flag", width: 32, height: 32 }) }), (0, jsx_runtime_1.jsx)("style", { jsx: true, children: `
        .language-switcher {
          position: fixed;
          bottom: 16px; /* Flytter til nedre høyre hjørne */
          right: 16px;
          z-index: 50;
          display: flex;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .language-switcher {
            bottom: 8px; /* Juster for mindre skjermer */
            right: 8px;
          }
        }
      ` })] }));
}
