const ModeSelector = ({ mode, setMode }) => {
  return (
    <div className="flex gap-4 mb-6">
      {["pomodoro", "short", "long"].map((m) => (
        <button
          key={m}
          className={`px-4 py-2 rounded-full transition-all font-semibold ${
            mode === m
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => setMode(m)}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
