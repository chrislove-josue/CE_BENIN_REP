import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

const AvatarEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const flyerRef = useRef();
  const dragging = useRef(false);

  const [IMAGE_SIZE, setImageSize] = useState(130);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (!flyerRef.current) return;
      const flyerRect = flyerRef.current.getBoundingClientRect();

      if (window.innerWidth >= 768) { // desktop et plus grands écrans
        setImageSize(160);
        setPos({
          x: flyerRect.width * (2 / 3), // début des 2/3 droite
          y: flyerRect.height - 130 - 88, // bas avec marge
        });
      } else { // mobile
        setImageSize(100);
        setPos({
          x: flyerRect.width * (2 / 3),
          y: flyerRect.height - 100 - 30,
        });
      }
    };

    // attendre que le flyer ait rendu
    setTimeout(updateSize, 50);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [flyerRef.current]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startDrag = () => (dragging.current = true);

  const moveImage = (clientX, clientY) => {
    if (!flyerRef.current) return;
    const flyerRect = flyerRef.current.getBoundingClientRect();

    const minX = flyerRect.width * (2 / 3);
    const maxX = flyerRect.width - IMAGE_SIZE;
    const minY = 0;
    const maxY = flyerRect.height - IMAGE_SIZE;

    let x = clientX - flyerRect.left - IMAGE_SIZE / 2;
    let y = clientY - flyerRect.top - IMAGE_SIZE / 2;

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    setPos({ x, y });
  };

  const onDrag = (e) => dragging.current && moveImage(e.clientX, e.clientY);
  const onTouchMove = (e) => dragging.current && moveImage(e.touches[0].clientX, e.touches[0].clientY);
  const stopDrag = () => (dragging.current = false);

  const handleExport = () => {
    html2canvas(flyerRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "rhapsody_wonder.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#2e004f", fontSize: "18px" }}>Conférence - Rhapsodie des Réalités</h1>

      <div
        ref={flyerRef}
        style={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          borderRadius: "12px",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        <img
          src="/flyer.png"
          alt="Flyer"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            pointerEvents: "none",
          }}
        />

        {userImage && (
          <div
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onTouchStart={startDrag}
            onTouchMove={onTouchMove}
            onTouchEnd={stopDrag}
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button onClick={handleExport} style={{ marginLeft: "10px" }}>
          Exporter l'image
        </button>
      </div>
    </div>
  );
};

export default AvatarEditor;
