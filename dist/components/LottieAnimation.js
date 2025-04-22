"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_lottie_1 = __importDefault(require("react-lottie"));
const football_loader_json_1 = __importDefault(require("../../public/lottie/football-loader.json")); // Bruk relativ sti
const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: football_loader_json_1.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (0, jsx_runtime_1.jsx)(react_lottie_1.default, { options: defaultOptions, height: 800, width: 400 });
};
exports.default = LottieAnimation;
