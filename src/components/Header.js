import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Ferme le menu à chaque changement d'URL
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img
            src="/image.png"
            alt="Logo"
            className="logo-img"
          />
        </div>

        {/* Bouton burger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="burger"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navbar */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Accueil
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
            À propos
          </Link>
          <Link to="/avatar" className="nav-link" onClick={() => setMenuOpen(false)}>
            Créer Avatar
          </Link>
        </nav>
      </div>

      {/* Styles */}
      <style>
        {`
          .header {
            background-color: #2e004f;
            color: white;
            max-width: 52rem;   /* max-w-xl */
            margin: 0 auto;     /* centre horizontal */
            padding: 15px 30px;
          }

          .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
          }

          .logo {
            display: flex;
            align-items: center;
          }

          .logo-img {
            height: 40px;
            margin-right: 10px;
          }

          .burger {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            display: none;
          }

          .nav {
            display: flex;
            gap: 30px;
          }

          .nav-link {
            color: white;
            text-decoration: none;
          }

          @media (max-width: 768px) {
            .burger {
              display: block;
            }

            .nav {
              overflow: hidden;
              flex-direction: column;
              gap: 15px;
              max-height: 0; 
              width: 100%;
              transition: max-height 0.3s ease;
            }

            .nav.open {
              max-height: 300px;
              margin-top: 10px;
            }
          }

          @media (min-width: 769px) {
            .nav {
              display: flex !important;
              max-height: none !important;
              flex-direction: row;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
