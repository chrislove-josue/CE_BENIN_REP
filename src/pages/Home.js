import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <main className="home">
    <h1>Bienvenue à la Conférence de Merveilles</h1>
    <p>Vivez une expérience transformationnelle avec Rhapsodie des Réalités.</p>

    <p>
      La Rhapsody Wonders Conference est un moment de célébration, d'enseignement et de transformation.
      Rejoignez des milliers de participants autour du monde dans une atmosphère de foi et de miracles.
    </p>
    
    <img
      src="/flyer.jpg"
      alt="Conférence"
      className="flyer"
    />
    <div className="button-container">
      <Link to="/avatar">
        <button>Créer mon avatar</button>
      </Link>
    </div>

    <style>
      {`
        .home {
          /* padding: 40px; */ /* desktop */
          text-align: center;
        }

        .flyer {
          max-width: 100%;
          border-radius: 12px;
        }

        .button-container {
          margin-top: 20px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .home {
            padding-left: 32px;  /* px-8 */
            padding-right: 32px; /* px-8 */
          }
        }
      `}
    </style>
  </main>
);

export default Home;
