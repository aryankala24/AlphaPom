import React, { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Calculate degrees for hands
  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6 + seconds * 0.1; // Smooth movement
  const hourDeg = ((hours % 12) + minutes / 60) * 30; // 360 / 12

  const isAM = hours < 12;

  // Numbers 1 to 12 positions on clock face
  const numbers = [...Array(12)].map((_, i) => {
    const num = i + 1;
    const angle = (num * 30 - 90) * (Math.PI / 180); // -90 to start from top
    const radius = 110; // distance from center

    const x = 150 + radius * Math.cos(angle);
    const y = 150 + radius * Math.sin(angle);

    return (
      <text
        key={num}
        x={x}
        y={y + 6} // Adjust vertical alignment
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="#444"
        style={{ userSelect: "none" }}
      >
        {num}
      </text>
    );
  });

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl select-none max-w-[320px] mx-auto">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="drop-shadow-lg"
      >
        {/* Clock circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="url(#clockGradient)"
          stroke="#888"
          strokeWidth="5"
          filter="url(#shadow)"
        />
        <defs>
          <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fefefe" />
            <stop offset="100%" stopColor="#d1d5db" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        {/* Numbers 1 to 12 */}
        {numbers}

        {/* Hour hand */}
        <line
          x1="150"
          y1="150"
          x2={150 + 60 * Math.cos((Math.PI / 180) * (hourDeg - 90))}
          y2={150 + 60 * Math.sin((Math.PI / 180) * (hourDeg - 90))}
          stroke="#333"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#shadow)"
        />

        {/* Minute hand */}
        <line
          x1="150"
          y1="150"
          x2={150 + 90 * Math.cos((Math.PI / 180) * (minuteDeg - 90))}
          y2={150 + 90 * Math.sin((Math.PI / 180) * (minuteDeg - 90))}
          stroke="#555"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#shadow)"
        />

        {/* Second hand */}
        <line
          x1="150"
          y1="150"
          x2={150 + 110 * Math.cos((Math.PI / 180) * (secondDeg - 90))}
          y2={150 + 110 * Math.sin((Math.PI / 180) * (secondDeg - 90))}
          stroke="#e11d48" // red
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center circle */}
        <circle cx="150" cy="150" r="8" fill="#222" />
      </svg>

      {/* AM/PM Indicator */}
      <div
        className={`px-6 py-2 mt-4 text-sm font-bold tracking-wide uppercase rounded-full shadow-lg border backdrop-blur-md bg-white/30 dark:bg-white/10 border-white/20 dark:border-neutral-700 text-center`}
        style={{
          color: isAM ? "#2563eb" : "#ea580c",
          textShadow: "0 0 8px rgba(0,0,0,0.3)",
          width: 80,
          userSelect: "none",
        }}
      >
        {isAM ? "AM" : "PM"}
      </div>

      {/* Digital Time & Date */}
      <div className="text-center mt-4 space-y-1 select-text">
        <div className="text-3xl font-mono font-semibold text-gray-800 dark:text-white drop-shadow">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <div className="text-md font-medium text-gray-600 dark:text-gray-300 tracking-wide">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
