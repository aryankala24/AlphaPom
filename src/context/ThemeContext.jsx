// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initial theme can be retrieved from localStorage if needed
  const [homeModeTheme, setHomeModeTheme] = useState("minimal-light");

  // Dispatch custom event on theme change
  useEffect(() => {
    const event = new CustomEvent("homeThemeUpdated", { detail: homeModeTheme });
    window.dispatchEvent(event);

    // Optional: Save to localStorage
    localStorage.setItem("homeModeTheme", homeModeTheme);
  }, [homeModeTheme]);

  // On load, check for stored theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("homeModeTheme");
    if (savedTheme) {
      setHomeModeTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ homeModeTheme, setHomeModeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for easier use
export const useTheme = () => useContext(ThemeContext);
