"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PlayVideo = () => {
    const videoRef = (0, react_1.useRef)(null);
    const [isMuted, setIsMuted] = (0, react_1.useState)(true);
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full md:w-3/4 mx-auto mb-20", children: [(0, jsx_runtime_1.jsxs)("video", { ref: videoRef, className: "w-full", loop: true, autoPlay: true, muted: isMuted, controls: false, children: [(0, jsx_runtime_1.jsx)("source", { src: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/promofdb.mp4", type: "video/mp4" }), "Din nettleser st\u00F8tter ikke video-taggen."] }), (0, jsx_runtime_1.jsx)("button", { onClick: toggleMute, className: "absolute bottom-3 right-3 bg-white bg-opacity-75 rounded p-2 text-sm text-gray-700 hover:bg-opacity-100", children: isMuted ? 'Slå på lyd' : 'Slå av lyd' })] }));
};
exports.default = PlayVideo;
