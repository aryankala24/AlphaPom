// Timer.jsx
import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <div className="absolute top-24 right-10 w-80 bg-[#0f172a]/80 text-white border border-white/20 rounded-2xl shadow-2xl p-5 flex items-center gap-4 backdrop-blur-md">
      <div className="flex items-center justify-center w-16 h-16 bg-[#1e293b] rounded-full shadow-inner border border-green-500">
        <i className="fas fa-clock text-2xl text-green-400 drop-shadow-lg"></i>
      </div>
      <div className="flex-1">
        <h3 className="text-sm text-green-300 tracking-widest uppercase font-semibold mb-1">Focus Time</h3>
        <p className="text-4xl font-black text-white drop-shadow">{formatTime(timeLeft)}</p>
        <div className="flex gap-2 mt-3">
          <button
            className="bg-green-500 hover:bg-green-600 text-sm px-4 py-1 rounded-full font-semibold shadow-md transition"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="bg-white/10 hover:bg-white/20 text-sm px-4 py-1 rounded-full font-medium border border-white/20 transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
