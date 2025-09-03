import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

const AvatarEditor = () => {
  const [userImage, setUserImage] = useState(null);
  const flyerRef = useRef();
  const dragging = useRef(false);

  const [IMAGE_SIZE, setImageSize] = useState(130);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // ✅ Correction : pas de dépendance sur flyerRef.current
 useEffect(() => {
  const updateSize = () => {
    if (!flyerRef.current) return;
    const flyerRect = flyerRef.current.getBoundingClientRect();

    if (flyerRect.width === 0 || flyerRect.height === 0) {
      console.log("Dimensions nulles, retry...");
      setTimeout(updateSize, 100); // retry plus tard
      return;
    }

    if (window.innerWidth >= 768) {
      setImageSize(160);
      setPos({
        x: flyerRect.width * (2 / 3),
        y: flyerRect.height - 130 - 88,
      });
    } else {
      setImageSize(100);
      setPos({
        x: flyerRect.width * (2 / 3),
        y: flyerRect.height - 100 - 38,
      });
    }

    console.log("Initial pos:", flyerRect.width, flyerRect.height);
  };

  const timeout = setTimeout(updateSize, 300); // attend plus longtemps
  window.addEventListener("resize", updateSize);

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("resize", updateSize);
  };
}, []);

const handleUpload = (e) => {
   const file = e.target.files[0];
  if (file) {
    // Vérifier extension MIME
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      alert("⚠️ Seules les images PNG et JPG/JPEG sont autorisées.");
      e.target.value = ""; // reset input
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

    if (file.size > MAX_SIZE) {
      alert("⚠️ L'image ne doit pas dépasser 5 Mo.");
      e.target.value = ""; // reset le champ file
      return;
    }

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
    html2canvas(flyerRef.current, {
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "rhapsody_of_realities_wonder_conference.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#2e004f", fontSize: "18px" }}>
        Conférence de Merveilles de Rhapsodie des Réalités
      </h1>

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
              backgroundColor: "red", // ✅ TEMP pour debug
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

      <div
        style={{
          marginTop: "20px",
          gap: "20px",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input 
  type="file" 
  accept="image/png, image/jpeg" 
  onChange={handleUpload} 
/>
       <button 
  onClick={handleExport} 
  disabled={!userImage} // ✅ Désactivé si pas d'image
  style={{

    cursor: userImage ? "pointer" : "not-allowed",
  
  }}
>
  Exporter l'avatar
</button>

      </div>

      {/* ✅ Aperçu temporaire pour debug */}
      {userImage && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Aperçu de l'image utilisateur :</p>
          <img
            src={userImage}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AvatarEditor;
