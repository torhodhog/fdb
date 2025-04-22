"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHoverEffect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const TextHoverEffect = ({ text, duration, }) => {
    const svgRef = (0, react_1.useRef)(null);
    const [cursor, setCursor] = (0, react_1.useState)({ x: 0, y: 0 });
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const [maskPosition, setMaskPosition] = (0, react_1.useState)({ cx: "50%", cy: "50%" });
    (0, react_1.useEffect)(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: svgRef, width: "100%", height: "100%", viewBox: "0 0 300 100", xmlns: "http://www.w3.org/2000/svg", onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onMouseMove: (e) => setCursor({ x: e.clientX, y: e.clientY }), className: "select-none", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsx)("linearGradient", { id: "textGradient", gradientUnits: "userSpaceOnUse", cx: "50%", cy: "50%", r: "25%", children: hovered && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0%", stopColor: "var(--yellow-500)" }), (0, jsx_runtime_1.jsx)("stop", { offset: "25%", stopColor: "var(--red-500)" }), (0, jsx_runtime_1.jsx)("stop", { offset: "50%", stopColor: "var(--blue-500)" }), (0, jsx_runtime_1.jsx)("stop", { offset: "75%", stopColor: "var(--cyan-500)" }), (0, jsx_runtime_1.jsx)("stop", { offset: "100%", stopColor: "var(--violet-500)" })] })) }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.radialGradient, { id: "revealMask", gradientUnits: "userSpaceOnUse", r: "20%", animate: maskPosition, transition: { duration: duration ?? 0, ease: "easeOut" }, children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0%", stopColor: "white" }), (0, jsx_runtime_1.jsx)("stop", { offset: "100%", stopColor: "black" })] }), (0, jsx_runtime_1.jsx)("mask", { id: "textMask", children: (0, jsx_runtime_1.jsx)("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#revealMask)" }) })] }), (0, jsx_runtime_1.jsx)("text", { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", strokeWidth: "0.3", className: "font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl  ", style: { opacity: hovered ? 0.7 : 0 }, children: text }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.text, { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", strokeWidth: "0.3", className: "font-[helvetica] font-bold fill-transparent text-7xl   stroke-neutral-200 dark:stroke-neutral-800", initial: { strokeDashoffset: 1000, strokeDasharray: 1000 }, animate: {
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }, transition: {
                    duration: 4,
                    ease: "easeInOut",
                }, children: text }), (0, jsx_runtime_1.jsx)("text", { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", stroke: "url(#textGradient)", strokeWidth: "0.3", mask: "url(#textMask)", className: "font-[helvetica] font-bold fill-transparent text-7xl  ", children: text })] }));
};
exports.TextHoverEffect = TextHoverEffect;
