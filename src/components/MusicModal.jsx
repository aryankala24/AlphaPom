import React, { useState, useEffect } from "react";

const MAX_FAVORITES = 5;

const MusicModal = ({ onClose }) => {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteMusic") || "[]");
    setFavorites(saved);
  }, []);

  const handleInputChange = (e) => setUrl(e.target.value);

  const getEmbedUrl = (inputUrl) => {
    if (inputUrl.includes("youtube.com") || inputUrl.includes("youtu.be")) {
      const videoId = inputUrl.includes("v=")
        ? inputUrl.split("v=")[1].split("&")[0]
        : inputUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (inputUrl.includes("spotify.com")) {
      const id = inputUrl.split("/").pop().split("?")[0];
      const type = inputUrl.includes("/track/") ? "track" : "playlist";
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      const generatedEmbedUrl = getEmbedUrl(url.trim());
      if (generatedEmbedUrl) {
        setEmbedUrl(generatedEmbedUrl);
      } else {
        alert("Unsupported URL. Only YouTube and Spotify supported.");
      }
      setUrl("");
    }
  };

  const handleSave = () => {
    if (!url.trim()) return;

    const existing = [...favorites];
    if (existing.includes(url)) {
      alert("Already saved in favorites!");
      return;
    }
    if (existing.length >= MAX_FAVORITES) {
      alert(`Maximum ${MAX_FAVORITES} favorites allowed.`);
      return;
    }

    const updated = [...existing, url.trim()];
    setFavorites(updated);
    localStorage.setItem("favoriteMusic", JSON.stringify(updated));
    alert("Saved to favorites!");
    setUrl("");
  };

  return (
    <div
      className="fixed top-0 left-0 h-full w-96 bg-black text-white z-50 shadow-2xl overflow-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="music-modal-title"
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white hover:text-gray-300 transition"
        aria-label="Close Music Modal"
      >
        <i className="fas fa-times text-xl"></i>
      </button>

      <div className="pt-16 px-6 pb-8">
        <h2 id="music-modal-title" className="text-3xl font-bold mb-6">Music</h2>

        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          Custom Playlists
          <span className="bg-purple-600 text-xs px-2 py-1 rounded font-bold">PLUS</span>
        </h3>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Add your favorite playlists from Spotify, YouTube, Apple Music,
          SoundCloud, or Amazon Music. Store up to 5 to favorites.
        </p>

        <div className="flex justify-between items-center text-2xl text-gray-400 mb-6 px-2">
          <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><i className="fab fa-spotify"></i></a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><i className="fab fa-youtube"></i></a>
          <a href="https://www.apple.com/apple-music/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100"><i className="fab fa-apple"></i></a>
          <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400"><i className="fab fa-soundcloud"></i></a>
          <a href="https://music.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><i className="fab fa-amazon"></i></a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <input
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste playlist or video URL here"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
            >
              Load
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition"
            >
              Save to Favorites
            </button>
          </div>
        </form>

        {embedUrl && (
          <div className="mb-6">
            <p className="text-sm text-gray-300 mb-2">Preview:</p>
            <div className="aspect-video w-full rounded overflow-hidden">
              <iframe
                src={embedUrl}
                title="Music Preview"
                width="100%"
                height="200"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Your Favorites</h4>
            <ul className="space-y-2">
              {favorites.map((fav, index) => (
                <li key={index} className="text-sm bg-gray-800 px-3 py-2 rounded-md flex justify-between items-center">
                  <span className="truncate w-64">{fav}</span>
                  <a
                    href={fav}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline text-xs"
                  >
                    Open
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicModal;
