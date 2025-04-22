"use strict";
'use client';
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEffect = TextEffect;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
const react_1 = __importStar(require("react"));
const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};
const defaultItemVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
};
const presetVariants = {
    blur: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: 'blur(12px)' },
            visible: { opacity: 1, filter: 'blur(0px)' },
        },
    },
    shake: {
        container: defaultContainerVariants,
        item: {
            hidden: { x: 0 },
            visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
        },
    },
    scale: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
        },
    },
    fade: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
    },
    slide: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        },
    },
};
const AnimationComponent = react_1.default.memo(({ word, variants, per }) => {
    if (per === 'word') {
        return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { "aria-hidden": 'true', variants: variants, className: 'inline-block whitespace-pre', children: word }));
    }
    return ((0, jsx_runtime_1.jsx)("span", { className: 'inline-block whitespace-pre', children: word.split('').map((char, charIndex) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { "aria-hidden": 'true', variants: variants, className: 'inline-block whitespace-pre', children: char }, `char-${charIndex}`))) }));
});
AnimationComponent.displayName = 'AnimationComponent';
function TextEffect({ children, per = 'word', as = 'p', variants, className, preset, }) {
    const words = children.split(/(\S+)/);
    const MotionTag = framer_motion_1.motion[as];
    const selectedVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: defaultItemVariants };
    const containerVariants = variants?.container || selectedVariants.container;
    const itemVariants = variants?.item || selectedVariants.item;
    const [isVisible, setIsVisible] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 5000); // 5 seconds interval for showing and hiding
        return () => clearInterval(interval);
    }, []);
    return ((0, jsx_runtime_1.jsx)(MotionTag, { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden', "aria-label": children, variants: containerVariants, className: className, children: words.map((word, wordIndex) => ((0, jsx_runtime_1.jsx)(AnimationComponent, { word: word, variants: itemVariants, per: per }, `word-${wordIndex}`))) }));
}
