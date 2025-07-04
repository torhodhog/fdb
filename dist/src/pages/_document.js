"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const document_1 = __importStar(require("next/document"));
class MyDocument extends document_1.default {
    render() {
        return ((0, jsx_runtime_1.jsxs)(document_1.Html, { lang: "en", children: [(0, jsx_runtime_1.jsxs)(document_1.Head, { children: [(0, jsx_runtime_1.jsx)("link", { rel: "icon", href: "/favico.ico" }), (0, jsx_runtime_1.jsx)("meta", { name: "description", content: "Your site description here" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:title", content: "Your site title here" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:description", content: "Your site description here" }), (0, jsx_runtime_1.jsx)("meta", { property: "og:image", content: "/thumbnail.jpg" }), (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: "no", href: "https://fotballdb.no" }), (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: "en", href: "https://en.fotballdb.no" }), (0, jsx_runtime_1.jsx)("script", { src: "https://cdn.weglot.com/weglot.min.js", async: true }), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                                __html: `
                Weglot.initialize({
                  api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'
                });
              `,
                            }, async: true }), (0, jsx_runtime_1.jsx)("script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=AW-16715509548" }), (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: {
                                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16715509548');
              `,
                            } })] }), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)(document_1.Main, {}), (0, jsx_runtime_1.jsx)(document_1.NextScript, {})] })] }));
    }
}
exports.default = MyDocument;
