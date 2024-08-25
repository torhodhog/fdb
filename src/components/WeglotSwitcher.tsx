'use client'

import React, { useEffect, useState } from "react";

export default function WeglotSwitcher() {
  const [weglotLoaded, setWeglotLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.weglot.com/weglot.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Weglot) {
        window.Weglot.initialize({
          api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'
        });
        console.log("Weglot initialized");
        setWeglotLoaded(true);
      } else {
        console.error("Weglot is not available on window");
      }
    };
    document.head.appendChild(script);

    // Skjul den innebygde Weglot-språkvelgeren
    const style = document.createElement("style");
    style.innerHTML = `
      #weglot_language_no, #weglot_language_en {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const switchLanguage = (lang: string) => {
    console.log(`Attempting to switch language to ${lang}`);
    if (weglotLoaded && window.Weglot) {
      window.Weglot.switchTo(lang);
      console.log(`Switched language to ${lang}`);
    } else {
      console.error("Weglot is not available on window");
    }
  };

  return (
    <div className="language-switcher">
      <button
        className="mr-4 ml-4"
        onClick={() => switchLanguage('no')}
      >
        <img className="w-8" src="norway-flag.png" alt="Norwegian Flag" />
      </button>
      <button onClick={() => switchLanguage('en')}>
        <img className="w-8" src="uk-flag.png" alt="UK Flag" />
      </button>
      <style jsx>{`
        .language-switcher {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 50;
          display: flex;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .language-switcher {
            top: 8px;
            left: 8px;
          }
        }
      `}</style>
    </div>
  );
}