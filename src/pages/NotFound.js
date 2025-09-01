import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main style={{ padding: "40px", textAlign: "center" }}>
    <h2>404 – Page non trouvée</h2>
    <p>Oups ! La page demandée n’existe pas.</p>
    <Link to="/">Retour à l’accueil</Link>
  </main>
);

export default NotFound;
