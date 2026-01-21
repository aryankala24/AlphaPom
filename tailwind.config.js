/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // for dark mode toggle support
  theme: {
    extend: {
      colors: {
        // Custom color palette if you want to use in theme styles
        sunset: {
          light: '#FFD1C1',
          DEFAULT: '#FF7E5F',
          dark: '#FF6B6B',
        },
        neon: {
          green: '#39FF14',
          pink: '#FF00FF',
        },
      },
    },
  },
  plugins: [],
};
