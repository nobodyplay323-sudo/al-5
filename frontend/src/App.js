import React, { useRef, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { Toaster } from "sonner";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Article from "@/pages/Article";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (lenisRef.current?.lenis) window.__lenis = lenisRef.current.lenis;
  }, []);

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="App">
        <NoiseOverlay />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articol/:slug" element={<Article />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              border: "2px solid #1A1A1A",
              borderRadius: "0px",
              background: "#F4F1EA",
              color: "#1A1A1A",
              fontFamily: "Satoshi, sans-serif",
              boxShadow: "6px 6px 0px 0px #1A1A1A",
            },
          }}
        />
      </div>
    </ReactLenis>
  );
}

export default App;
