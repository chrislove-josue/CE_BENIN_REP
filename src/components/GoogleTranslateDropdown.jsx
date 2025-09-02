// src/components/GoogleTranslateDropdown.jsx
import React, { useEffect } from "react";
//import "../index.css";

const GoogleTranslateDropdown = () => {
  useEffect(() => {
    // Charger le script Google Translate
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.defer = true;
    document.body.appendChild(script);

    // Fonction globale pour init Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "fr,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="lang-selector">
      {/* Google injectera le select ici */}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslateDropdown;
