"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceWorkerRegistration;
const react_1 = require("react");
function ServiceWorkerRegistration() {
    (0, react_1.useEffect)(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
            })
                .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
        }
    }, []);
    return null;
}
