import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import quotes from "../data/quotes";
import "./Home.css";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [quote, setQuote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(null);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote(); // Show quote on initial render
  }, []);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setIsActive(true);
    getRandomQuote(); // Change quote every time timer starts
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    getRandomQuote(); // Optional: change quote on reset
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-2xl p-2"
      >
        {darkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>

      <h1 className="text-4xl font-bold mb-8 text-center">AlphaPom</h1>

      <div className="w-72 h-72 rounded-full border-8 border-blue-500 flex items-center justify-center text-5xl font-semibold shadow-xl">
        {formatTime(timeLeft)}
      </div>

      <div className="flex space-x-4 mt-6">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg flex items-center space-x-2"
          >
            <FaPlay />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-lg flex items-center space-x-2"
          >
            <FaPause />
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg flex items-center space-x-2"
        >
          <FaRedo />
          <span>Reset</span>
        </button>
      </div>

      {/* Quotes Section */}
      <div className="mt-10 bg-yellow-100 dark:bg-yellow-200 px-6 py-4 rounded-xl shadow-md max-w-lg">
        <p className="text-lg italic text-gray-800 text-center">“{quote}”</p>
      </div>
    </div>
  );
}
