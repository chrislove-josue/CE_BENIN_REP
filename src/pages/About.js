import React from "react";

const About = () => (
  <main className="about">
    <h2>À propos de la Conférence</h2>
    <p>
      La Rhapsody Wonders Conference est un moment de célébration, d'enseignement et de transformation.
      Rejoignez des milliers de participants autour du monde dans une atmosphère de foi et de miracles.
    </p>

    <style>
      {`
        /*.about {
          padding: 40px;       /* desktop padding */
          max-width: 800px;    /* limite largeur */
          margin: auto;        /* centré */
        }*/

        /* Mobile */
        @media (max-width: 768px) {
          .about {
            padding-left: 32px;  /* px-8 */
            padding-right: 32px; /* px-8 */
          }
        }
      `}
    </style>
  </main>
);

export default About;
