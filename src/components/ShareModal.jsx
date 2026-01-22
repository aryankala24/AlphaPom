import React from "react";

const ShareModal = ({ onClose }) => {
  const currentUrl = window.location.href;

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "AlphaPom",
          text: "Check out this aesthetic Pomodoro Timer!",
          url: currentUrl,
        })
        .catch(console.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-black/40 text-white rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl p-6 w-[90%] max-w-md text-center animate-fade-in transition-all duration-300">
        
        {/* Close (X) button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg transition"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2 text-green-400">Share AlphaPom</h2>
        <p className="text-sm text-gray-300 mb-4">
          Love using <span className="text-green-500 font-semibold">AlphaPom</span>? Share it with friends and help them stay focused too!
        </p>

        <div className="flex items-center justify-between border border-white/20 rounded-lg px-3 py-2 mb-4 bg-white/10">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="bg-transparent w-full text-sm text-white outline-none placeholder-gray-400"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              alert("Link copied to clipboard!");
            }}
            className="text-green-400 font-semibold hover:underline ml-2"
          >
            Copy
          </button>
        </div>

        <div className="flex justify-center gap-5 mb-4 text-2xl">
          <a
            href={`https://api.whatsapp.com/send?text=Check out AlphaPom Timer: ${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:scale-110 transition"
            aria-label="Share on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=Check out AlphaPom Timer!&url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:scale-110 transition"
            aria-label="Share on Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:scale-110 transition"
            aria-label="Share on Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition mb-2"
          >
            Share via Device
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
