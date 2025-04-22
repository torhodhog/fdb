"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ResponsiveVideo = ({ src, alt }) => ((0, jsx_runtime_1.jsx)("div", { className: " w-full h-auto z-[1]", children: (0, jsx_runtime_1.jsx)("video", { src: src, loop: true, autoPlay: true, muted: true, playsInline // For å forhindre autoplay-restrictions på noen mobile nettlesere
        : true, className: "w-full h-full object-cover" // Endret fra object-contain til object-cover for å fylle skjermen
     }) }));
exports.default = ResponsiveVideo;
