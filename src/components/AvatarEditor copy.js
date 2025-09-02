import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
const DEFAULT_IMAGE = "/default-avatar.png"; 


const AvatarEditor = () => {
  //const [userImage, setUserImage] = useState(null);
  const flyerRef = useRef();
  const dragging = useRef(false);
  const [userImage, setUserImage] = useState(DEFAULT_IMAGE);
  
  const [IMAGE_SIZE, setImageSize] = useState(130);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (!flyerRef.current) return;
      const flyerRect = flyerRef.current.getBoundingClientRect();

      if (flyerRect.width === 0 || flyerRect.height === 0) {
        setTimeout(updateSize, 100);
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
          y: flyerRect.height - 100 - 25,
        });
      }
    };

    const timeout = setTimeout(updateSize, 300);
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
    html2canvas(flyerRef.current, { useCORS: true, allowTaint: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "rhapsody_of_realities_wonder_conference.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="avatar-editor">
      <h1>Conférence de Merveilles de Rhapsodie des Réalités</h1>

      <div ref={flyerRef} className="flyer-container">
        <img src="/flyer.png" alt="Flyer" className="flyer-img" />

        {userImage && (
         <div
  onMouseDown={startDrag}
  onMouseMove={onDrag}
  onMouseUp={stopDrag}
  onTouchStart={startDrag}
  onTouchMove={onTouchMove}
  onTouchEnd={stopDrag}
  className="user-image"
  style={{ left: pos.x, top: pos.y, width: IMAGE_SIZE, height: IMAGE_SIZE }}
>
  <img src={userImage} alt="Utilisateur" />
</div>
        )}
      </div>

      <div className="controls">
<input 
  type="file" 
  accept="image/png, image/jpeg" 
  onChange={handleUpload} 
/>
        <button onClick={handleExport}>Exporter l'avatar</button>
      </div>

      {/* {userImage && (
        <div className="preview">
          <p>Aperçu de l'image utilisateur :</p>
          <img src={userImage} alt="Preview" />
        </div>
      )} */}

      <style>
        {`
          .avatar-editor {
            padding: 40px;
            text-align: center;
            max-width: 500px;
            margin: auto;
          }

          .flyer-container {
            position: relative;
            display: inline-block;
            width: 100%;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            border-radius: 12px;
            user-select: none;
            overflow: hidden;
          }

          .flyer-img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            pointer-events: none;
          }

          .user-image {
            position: absolute;
            border-radius: 50%;
            overflow: hidden;
            cursor: grab;
            background-color: red; /* debug */
          }

          .user-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .controls {
            margin-top: 20px;
            gap: 20px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }

          .preview {
            margin-top: 20px;
          }

          .preview img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
          }

          /* Mobile */
          @media (max-width: 768px) {
            .avatar-editor {
              padding-left: 32px;  /* px-8 */
              padding-right: 32px; /* px-8 */
            }
          }
        `}
      </style>
    </div>
  );
};

export default AvatarEditor;
