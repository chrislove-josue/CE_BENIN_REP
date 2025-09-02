import React from "react";
import AvatarEditor from "./AvatarEditor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Création d'avatar personnalisé</h1>
      <AvatarEditor />
         <Analytics />
        <SpeedInsights />
    </div>
  );
}

export default App;
