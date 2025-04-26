"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Assistant() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const alleredeSett = localStorage.getItem("assistVis");
    if (!alleredeSett) {
      setTimeout(() => {
        setVis(true);
        localStorage.setItem("assistVis", "true");
      }, 2000); // vises etter 2 sek
    }
  }, []);

  if (!vis) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center animate-fadeIn z-50">
      <div className="relative bg-white shadow-lg rounded-lg p-4 mb-2 max-w-xs">
        <button
          onClick={() => setVis(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-black py-8"
        >
          ✖️
        </button>
        <p className="text-sm text-gray-800">
          Hei! 👋 Nå kan du favorittmarkere drakter og følge med på Draktligaen lengre ned på siden! ⚽️❤️
        </p>
      </div>
      
    </div>
  );
}
