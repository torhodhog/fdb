"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnClickOutside = void 0;
const react_1 = require("react");
const useOnClickOutside = (ref, handler) => {
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            const el = ref?.current;
            if (!el || el.contains(event?.target || null)) {
                return;
            }
            handler(event); // Call the handler only if the click is outside of the element passed.
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]); // Reload only if ref or handler changes
};
exports.useOnClickOutside = useOnClickOutside;
