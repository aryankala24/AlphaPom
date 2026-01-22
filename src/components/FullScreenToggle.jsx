// components/FullScreenToggle.jsx
import React, { useState, useEffect } from "react";

const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <button
      onClick={toggleFullScreen}
      className="p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition"
      aria-label="Toggle Fullscreen"
    >
      <i className={`fas ${isFullScreen ? "fa-compress" : "fa-expand"}`}></i>
    </button>
  );
};

export default FullScreenToggle;
