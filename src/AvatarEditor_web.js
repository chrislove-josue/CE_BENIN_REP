import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

const AvatarEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const flyerRef = useRef();
  const dragging = useRef(false);

  const IMAGE_SIZE = 160; // taille fixe du cercle
  const [pos, setPos] = useState({ x: 333, y: 0 }); // x ajusté plus à gauche

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startDrag = () => {
    dragging.current = true;
  };

  const onDrag = (e) => {
    if (!dragging.current) return;
    const flyerRect = flyerRef.current.getBoundingClientRect();

    // Limiter l'image dans la zone du tiers droit, légèrement décalé vers la gauche
    const minX = flyerRect.width * 0.6; // avant 2/3, donc plus à gauche
    const maxX = flyerRect.width - IMAGE_SIZE;
    const minY = 0;
    const maxY = flyerRect.height - IMAGE_SIZE;

    let x = e.clientX - flyerRect.left - IMAGE_SIZE / 2;
    let y = e.clientY - flyerRect.top - IMAGE_SIZE / 2;

    // Limiter la position dans la zone autorisée
    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    setPos({ x, y });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  // Ajuster la position initiale proche du bas après le rendu
  useEffect(() => {
    if (flyerRef.current) {
      const flyerHeight = flyerRef.current.getBoundingClientRect().height;
      setPos((prev) => ({
        ...prev,
        y: flyerHeight - IMAGE_SIZE - 58, // marge depuis le bas
      }));
    }
  }, [flyerRef.current]);

  const handleExport = () => {
    html2canvas(flyerRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "flyer-final.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div>
      <h1 style={{ color: "#2e004f" }}>Conférence - Rhapsodie des Réalités</h1>

      <div
        ref={flyerRef}
        style={{
          position: "relative",
          display: "inline-block",
          boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          borderRadius: "12px",
          userSelect: "none",
        }}
      >
        {/* Flyer de fond statique */}
        <img
          src="/flyer.png"
          alt="Flyer"
          style={{
            width: "500px",
            height: "auto",
            borderRadius: "12px",
            pointerEvents: "none",
          }}
        />

        {/* Image utilisateur circulaire et déplaçable */}
        {userImage && (
          <div
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: `${IMAGE_SIZE}px`,
              height: `${IMAGE_SIZE}px`,
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "grab",
            }}
          >
            <img
              src={userImage}
              alt="Utilisateur"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button onClick={handleExport} style={{ marginLeft: "10px" }}>
          Exporter l'image
        </button>
      </div>
    </div>
  );
};

export default AvatarEditor;
