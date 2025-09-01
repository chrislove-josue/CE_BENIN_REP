import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AvatarEditor from "./components/AvatarEditor";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/avatar" element={<AvatarEditor />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Analytics />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
