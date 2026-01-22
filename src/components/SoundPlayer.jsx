import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaStop } from "react-icons/fa";

const sounds = [
  { id: 1, name: "Rain", icon: "https://www.svgrepo.com/show/431884/rain.svg", soundUrl: "/sounds/rain.mp3" },
  { id: 2, name: "Forest", icon: "https://www.svgrepo.com/show/317386/forest-burn.svg", soundUrl: "/sounds/forest.mp3" },
  { id: 3, name: "Waves", icon: "https://www.svgrepo.com/show/490388/surfing.svg", soundUrl: "/sounds/waves.mp3" },
  { id: 4, name: "Fireplace", icon: "https://www.svgrepo.com/show/313441/fireplace.svg", soundUrl: "/sounds/fireplace.mp3" },
  { id: 5, name: "Wind", icon: "https://www.svgrepo.com/show/530100/wind-energy.svg", soundUrl: "/sounds/wind.mp3" },
  { id: 6, name: "Birds", icon: "https://www.svgrepo.com/show/417388/bird.svg", soundUrl: "/sounds/birds.mp3" },
  { id: 7, name: "Ladybug", icon: "https://www.svgrepo.com/show/113281/ladybug.svg", soundUrl: "/sounds/crickets.mp3" },
  { id: 8, name: "Thunder", icon: "https://www.svgrepo.com/show/501876/lightning-lightning.svg", soundUrl: "/sounds/thunder.mp3" },
];

const SoundPlayer = ({ onClose }) => {
  const [playingSounds, setPlayingSounds] = useState({});
  const [volumes, setVolumes] = useState({});
  const audioRefs = useRef({});

  useEffect(() => {
    sounds.forEach(({ id, soundUrl }) => {
      const audio = new Audio(soundUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audioRefs.current[id] = audio;
      setVolumes((prev) => ({ ...prev, [id]: 0.5 }));
    });
    return () => stopAllSounds();
  }, []);

  const toggleSound = (id) => {
    const audio = audioRefs.current[id];
    if (audio) {
      const isPlaying = playingSounds[id];
      isPlaying ? audio.pause() : audio.play();
      setPlayingSounds((prev) => ({ ...prev, [id]: !isPlaying }));
    }
  };

  const changeVolume = (id, value) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = value;
      setVolumes((prev) => ({ ...prev, [id]: value }));
    }
  };

  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setPlayingSounds({});
  };

  const muteAllSounds = () => {
    Object.values(audioRefs.current).forEach((audio) => (audio.volume = 0));
    setVolumes((prev) => {
      const muted = {};
      Object.keys(prev).forEach((id) => (muted[id] = 0));
      return muted;
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className="bg-black/70 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
        style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-base font-semibold tracking-tight select-none">
            Ambient Sounds
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-green-400 transition"
            aria-label="Close sound player"
          >
            &times;
          </button>
        </div>

        {/* Controls */}
        <div className="flex justify-between mb-4 text-xs gap-2">
          <button
            onClick={stopAllSounds}
            className="flex-1 bg-red-700 hover:bg-red-800 rounded-lg py-1 text-white font-medium shadow-md transition"
          >
            <FaStop className="inline mr-1" />
            Stop All
          </button>
          <button
            onClick={muteAllSounds}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg py-1 text-black font-medium shadow-md transition"
          >
            <FaVolumeMute className="inline mr-1" />
            Mute All
          </button>
        </div>

        {/* Sounds Grid */}
        <div className="grid grid-cols-4 gap-3">
          {sounds.map(({ id, name, icon }) => {
            const isPlaying = playingSounds[id];
            const volume = volumes[id] ?? 0.5;

            return (
              <div
                key={id}
                className={`flex flex-col items-center justify-center rounded-lg p-2 cursor-pointer
                bg-white/10 border border-white/20
                ${isPlaying ? "bg-green-700/30 border-green-400" : "hover:bg-green-700/20 hover:border-green-400"}
                transition`}
                onClick={() => toggleSound(id)}
                role="button"
                aria-pressed={isPlaying}
                aria-label={`${isPlaying ? "Pause" : "Play"} ${name} sound`}
              >
                <img
                  src={icon}
                  alt={name}
                  className="w-8 h-8 mb-1 drop-shadow-md select-none"
                  draggable={false}
                />
                <span className="text-[10px] text-white select-none mb-1">{name}</span>
                <div className="flex items-center w-full space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSound(id);
                    }}
                    aria-label={isPlaying ? `Pause ${name}` : `Play ${name}`}
                    className="text-green-400 hover:text-green-600"
                  >
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      e.stopPropagation();
                      changeVolume(id, parseFloat(e.target.value));
                    }}
                    className="w-full h-1 rounded-full accent-green-400 cursor-pointer"
                    aria-label={`Volume control for ${name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoundPlayer;
