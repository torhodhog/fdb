"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const HeroVideo = () => {
    const videoRef = (0, react_1.useRef)(null);
    const [isMuted, setIsMuted] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);
    const toggleMute = () => {
        if (videoRef.current) {
            const currentMutedState = videoRef.current.muted;
            videoRef.current.muted = !currentMutedState;
            setIsMuted(!currentMutedState);
            console.log('Muted:', !currentMutedState);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full md:block hidden mt-6", style: { height: "600px" }, children: [(0, jsx_runtime_1.jsx)("video", { ref: videoRef, className: "absolute inset-0 w-full h-full object-cover cursor-pointer", autoPlay: true, loop: true, muted: isMuted, controls: false, onClick: toggleMute, children: (0, jsx_runtime_1.jsx)("source", { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/herovideo.mp4", type: "video/mp4" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: toggleMute, className: "absolute bottom-3 right-3 bg-white bg-opacity-75 rounded p-2 text-sm text-gray-700 hover:bg-opacity-100 z-10", children: isMuted ? 'Slå på lyd' : 'Slå av lyd' }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-80 h-80 rounded-full overflow-hidden spin", style: { margin: 0, padding: 0 } }) })] }));
};
exports.default = HeroVideo;
