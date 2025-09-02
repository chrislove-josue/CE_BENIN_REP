import React from "react";

const Footer = () => {
  const message = encodeURIComponent(
    "Bonjour Brother Chrislove Josué, je viens du site Rhapsody Wonders Conference "
  );

  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        fontSize: "14px",
      }}
      
    >
      &copy; {new Date().getFullYear()} Rhapsody of Realities Wonders Conference. Tous droits réservés. Powered by{" "}
      <a
        href={`https://wa.me/22998123353?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#25D366",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
        }}
      className="mx-4"
      >
       Chrislove Josué 
      </a>
    </footer>
  );
};

export default Footer;
