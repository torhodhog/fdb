"use client";

import { useState, useEffect } from "react";

const PopupNewsletter = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Vis popup etter 60 sekunder
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 60000 millisekunder = 60 sekunder

    // Rydd opp når komponenten fjernes
    return () => clearTimeout(timer);
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
        alert("Takk for at du meldte deg på nyhetsbrevet!");
      } else {
        alert("Noe gikk galt. Vennligst prøv igjen.");
      }
    } catch (error) {
      alert("Noe gikk galt. Vennligst prøv igjen.");
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-2">Meld deg på vårt nyhetsbrev!</h2>
            <p className="text-gray-700 mb-4">
              Få tilsendt meldinger om salg, nyheter og eventer direkte i
              innboksen din. Ikke gå glipp av noe!
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-postadresse"
              className="p-2 border rounded-md w-full mb-4"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Meld deg på
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Ved å melde deg på samtykker du til å motta nyhetsbrev fra oss.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:text-gray-700 mt-4 underline"
            >
              Lukk
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupNewsletter;
