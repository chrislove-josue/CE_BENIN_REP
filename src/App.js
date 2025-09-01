import React from "react";
import AvatarEditor from "./AvatarEditor";
import { Analytics } from "@vercel/analytics/react"
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Création d'avatar personnalisé</h1>
      <AvatarEditor />
      <Analytics/>
    </div>
  );
}

export default App;
