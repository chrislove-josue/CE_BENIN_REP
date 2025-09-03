import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("fr");
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLanguageChange = (lang) => {
    const cookieValue = `/fr/${lang}`;
    document.cookie = `googtrans=${cookieValue};path=/;domain=${window.location.hostname}`;
    window.location.reload();
  };

  return (
    <header className="header">
      {/* Ligne 1 : logo */}
      <div className="header-top">
        <div className="logo">
          <img src="/image.png" alt="Logo" className="logo-img" />
        </div>
      </div>

      {/* Ligne 2 pour mobile : burger + langue */}
      <div className="header-bottom">
     
        <div className="lang-mobile">
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
            {language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              <button onClick={() => handleLanguageChange("fr")}>🇫🇷 Français</button>
              <button onClick={() => handleLanguageChange("en")}>🇬🇧 English</button>
            </div>
          )}
        </div>

           <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* Navigation */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link"> {language === "fr" ? "Accueil" : "Home"} </Link>
        {/* <Link to="/about" className="nav-link"> {language === "fr" ? "À propos" : "About"} </Link> */}
        <Link to="/avatar" className="nav-link"> {language === "fr" ? "Créer Avatar" : "Create Avatar"} </Link>
      </nav>

      {/* Sélecteur langue desktop / tablette */}
      <div className="lang-desktop">
        <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
          {language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
        </button>
        {langOpen && (
          <div className="lang-dropdown">
            <button onClick={() => handleLanguageChange("fr")}>🇫🇷 Français</button>
            <button onClick={() => handleLanguageChange("en")}>🇬🇧 English</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
