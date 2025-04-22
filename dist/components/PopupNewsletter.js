"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const PopupNewsletter = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [showPopup, setShowPopup] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // Sjekk om popupen kan vises
        const lastShown = localStorage.getItem("newsletterLastShown");
        const now = new Date().getTime();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutter i millisekunder
        if (!lastShown || now - parseInt(lastShown) > thirtyMinutes) {
            // Vis popupen etter 30 sekunder hvis det har gått mer enn 30 minutter
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 600000); // 30000 millisekunder = 30 sekunder
            // Rydd opp når komponenten fjernes
            return () => clearTimeout(timer);
        }
    }, []);
    const handleSubscribe = async () => {
        if (!email) {
            alert("Vennligst skriv inn en gyldig e-postadresse.");
            return;
        }
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setEmail(""); // Tøm inputfeltet
                setShowPopup(false); // Skjul popup
                localStorage.setItem("newsletterSubscribed", "true"); // Lagre at brukeren har meldt seg på
                alert("Takk for at du meldte deg på nyhetsbrevet!");
            }
            else {
                alert("Noe gikk galt. Vennligst prøv igjen.");
            }
        }
        catch (error) {
            alert("Noe gikk galt. Vennligst prøv igjen.");
        }
    };
    const handleClose = () => {
        setShowPopup(false);
        // Lagre tidspunktet for når popupen ble lukket
        localStorage.setItem("newsletterLastShown", new Date().getTime().toString());
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showPopup && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold mb-2", children: "Meld deg p\u00E5 v\u00E5rt nyhetsbrev!" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 mb-4", children: "F\u00E5 tilsendt meldinger om salg, nyheter og eventer direkte i innboksen din. Ikke g\u00E5 glipp av noe!" }), (0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Din e-postadresse", className: "p-2 border rounded-md w-full mb-4" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSubscribe, className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full", children: "Meld deg p\u00E5" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-2", children: "Ved \u00E5 melde deg p\u00E5 samtykker du til \u00E5 motta nyhetsbrev fra oss." }), (0, jsx_runtime_1.jsx)("button", { onClick: handleClose, className: "text-gray-500 hover:text-gray-700 mt-4 underline", children: "Lukk" })] }) })) }));
};
exports.default = PopupNewsletter;
