"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
class ErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-[400px] flex items-center justify-center px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center max-w-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "w-8 h-8 text-red-600" }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Noe gikk galt" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-6", children: "Vi beklager, men det oppstod en feil. Pr\u00F8v \u00E5 laste siden p\u00E5 nytt." }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => window.location.reload(), className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "w-4 h-4 mr-2" }), "Last p\u00E5 nytt"] })] }) }));
        }
        return this.props.children;
    }
}
exports.default = ErrorBoundary;
