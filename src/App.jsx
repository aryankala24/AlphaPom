import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import MusicModal from "./components/MusicModal";
import SoundPlayer from "./components/SoundPlayer";
import FullScreenToggle from "./components/FullScreenToggle";
import { useTheme, ThemeProvider } from "./context/ThemeContext";
// Removed unused import THEME_IMAGES
import ShareModal from "./components/ShareModal";
import SettingsModal from "./components/SettingsModal";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const userName = "Aryan";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const getDynamicBgClass = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "bg-gradient-to-br from-red-200 via-orange-300 to-yellow-300";
  } else if (hour >= 12 && hour < 18) {
    return "bg-gradient-to-br from-blue-300 via-cyan-400 to-blue-600";
  } else {
    return "bg-gradient-to-br from-purple-900 via-indigo-900 to-black";
  }
};

const StatsTab = () => {
  // Static example data for charts
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Pomodoro Sessions",
        data: [3, 5, 4, 6, 2, 1, 4],
        backgroundColor: "#10b981", // Tailwind green
      },
    ],
  };

  const doughnutData = {
    labels: ["Work", "Break", "Idle"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#10b981", "#3b82f6", "#f87171"], // green, blue, red
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Pomodoro Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-medium mb-2">Sessions Per Day</h3>
          <Bar data={barData} />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Time Distribution</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
      <p className="mt-6 text-center text-gray-500 dark:text-gray-300">
        Detailed stats and charts coming soon!
      </p>
    </div>
  );
};

const AppContent = () => {
  const { homeModeTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("Home");

  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isSoundPlayerOpen, setIsSoundPlayerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = new Date().getHours();

  return (
    <div
      className={`h-screen w-full bg-cover bg-center relative transition-all duration-700 select-none ${
        selectedTab === "Home" ? getDynamicBgClass() : "bg-gray-900"
      } ${homeModeTheme ? homeModeTheme : ""}`}
      style={{
        backgroundImage:
          selectedTab === "Home"
            ? undefined
            : "url('https://www.alltrails.com/_next/image?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTE1MjUyNzQvZGYyN2NhMWIyYjZjYjEwMjgwNWRlYjE2NjQ0OTk2YzYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0%3D&w=3840&q=75')",
      }}
    >
      {/* Night stars overlay */}
      {selectedTab === "Home" && (hour < 5 || hour >= 18) && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="bg-stars bg-repeat w-full h-full opacity-30 animate-twinkle" />
        </div>
      )}

      {/* Logo */}
      <div className="absolute top-6 left-6 text-white font-extrabold text-5xl z-40 select-none drop-shadow-[0_0_3px_black]">
        Alpha<span className="text-green-600">Pom</span>
        <p className="text-sm font-normal tracking-wider mt-1 select-text drop-shadow-md">
          by Aryan Kala
        </p>
      </div>

      {/* Tabs Navigation */}
      <nav className="absolute top-6 right-6 z-50 flex space-x-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2 shadow-md text-white">
        {["Home", "Timer", "Stats"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              selectedTab === tab
                ? "bg-green-600 text-white"
                : "hover:bg-white hover:text-green-600 text-white/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center text-white text-center h-full w-full px-6 relative overflow-hidden">
        {selectedTab === "Home" && (
          <>
            <div className="absolute top-10 left-10 w-48 h-48 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 opacity-15 rounded-full blur-3xl animate-pulse-slower pointer-events-none"></div>

            <p className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-xl tracking-wider uppercase z-20 relative animate-fade-slide-up">
              {getGreeting()}, <span className="font-extrabold">{userName.toUpperCase()}</span>! <br />
              Make today your masterpiece.
            </p>

            <div className="text-[110px] md:text-[160px] font-extrabold drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] tracking-wide font-mono select-text z-20 relative animate-fade-slide-up">
              {currentTime}
            </div>

            <blockquote
              className="mt-8 max-w-xl text-lg italic text-white/80 drop-shadow-md tracking-wide z-20 relative animate-fade-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              "Focus on the journey, not just the destination."
            </blockquote>
          </>
        )}

        {selectedTab === "Timer" && <Timer />}

        {selectedTab === "Stats" && <StatsTab />}
      </main>

      {/* Music and Sound Buttons */}
      <div className="absolute bottom-20 left-6 flex gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-md z-50">
        <button
          onClick={() => setIsMusicOpen((prev) => !prev)}
          className={`p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition ${
            isMusicOpen ? "bg-[#333333cc]" : ""
          }`}
          aria-label="Toggle Music Modal"
        >
          <i className="fas fa-music"></i>
        </button>
        <button
          onClick={() => setIsSoundPlayerOpen((prev) => !prev)}
          className={`p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition ${
            isSoundPlayerOpen ? "bg-[#333333cc]" : ""
          }`}
          aria-label="Toggle Sound Player"
        >
          <i className="fas fa-volume-up"></i>
        </button>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-20 right-6 flex items-center gap-4 z-50">
        {/* Mode + Share */}
        <div className="flex gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-md">
          <button
            onClick={() => setSelectedTab("Timer")}
            className={`p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition ${
              selectedTab === "Timer" ? "bg-[#333333cc]" : ""
            }`}
            aria-label="Timer"
          >
            <i className="fas fa-seedling"></i>
          </button>
          <button
            onClick={() => setSelectedTab("Home")}
            className={`p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition ${
              selectedTab === "Home" ? "bg-[#333333cc]" : ""
            }`}
            aria-label="Home"
          >
            <i className="fas fa-home"></i>
          </button>
          <button
            onClick={() => setIsShareOpen(true)}
            className="p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition"
            aria-label="Share AlphaPom"
          >
            <i className="fas fa-gift"></i>
          </button>
        </div>

        {/* Settings Button */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-md">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full text-white hover:bg-[#333333cc] hover:animate-pulse transition"
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>

        {/* Fullscreen */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-md">
          <FullScreenToggle />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md text-white text-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between z-30 border-t border-white/20">
        <div className="mb-2 md:mb-0 flex items-center gap-3 text-center md:text-left">
          <img
            src="/images/aryan.jpg"
            alt="Aryan Kala"
            className="w-8 h-8 rounded-full border-2 shadow-md"
          />
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-green-400">AlphaPom</span>. All rights
            reserved.
          </span>
        </div>

        <div className="flex gap-6 items-center">
          <p className="text-white text-sm md:text-base">
            Created by <span className="font-semibold text-green-400">Aryan Kala</span>
          </p>
          <div className="flex gap-4 text-xl">
            <a
              href="mailto:aryankala250@gmail.com"
              className="hover:text-red-500 hover:animate-pulse transition"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://github.com/aryankala24/my-projects"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 hover:animate-pulse transition"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isMusicOpen && <MusicModal onClose={() => setIsMusicOpen(false)} />}
      {isSoundPlayerOpen && <SoundPlayer onClose={() => setIsSoundPlayerOpen(false)} />}
      {isShareOpen && <ShareModal onClose={() => setIsShareOpen(false)} />}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
