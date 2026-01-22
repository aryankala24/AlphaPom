// components/SettingsModal.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Stats from "./Stats";
import Clock from "./Clock";
import Quote from "./Quote";

const TABS = [
    { label: "Clock", icon: "fa-clock" },
    { label: "Stats", icon: "fa-chart-line" },
    { label: "Notepad", icon: "fa-pen" },
    { label: "Quotes", icon: "fa-quote-right" },
    { label: "Profile", icon: "fa-user" },
    { label: "Support & Feedback", icon: "fa-headset" },
];

const HOME_MODE_THEMES = [
    { id: "minimal-light", label: "Minimal Light" },
    { id: "minimal-dark", label: "Minimal Dark" },
    { id: "purple-dream", label: "Purple Dream" },
    { id: "sunset-glow", label: "Sunset Glow" },
    { id: "mountain-mist", label: "Mountain Mist" },
    { id: "ocean-breeze", label: "Ocean Breeze" },
    { id: "forest-calm", label: "Forest Calm" },
    { id: "night-sky", label: "Night Sky" },
    { id: "desert-gold", label: "Desert Gold" },
    { id: "city-lights", label: "City Lights" },
    { id: "aerial", label: "Aerial" },
    { id: "emerald-forest", label: "Emerald Forest" },
];

const FOCUS_TIMER_DEFAULTS = {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
};

const SettingsModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("Clock");

    // === Top‐level state for all settings ===
    const { homeModeTheme, setHomeModeTheme } = useTheme();
    const [focusTheme, setFocusTheme] = useState("purple-dream");
    const [ambientTheme, setAmbientTheme] = useState("forest-calm");
    const [soundOn, setSoundOn] = useState(true);
    const [notificationSound, setNotificationSound] = useState("bell");
    const [quotesOn, setQuotesOn] = useState(true);
    const [focusTimerSettings, setFocusTimerSettings] = useState(
        FOCUS_TIMER_DEFAULTS
    );
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    // === Notepad state + persistence ===
    const [note, setNote] = useState("");
    useEffect(() => {
        const savedNote = localStorage.getItem("userNote");
        if (savedNote) {
            setNote(savedNote);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("userNote", note);
    }, [note]);

    // Load all settings (except note) from localStorage on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("alphapom-settings"));
        if (stored) {
            setHomeModeTheme(stored.homeModeTheme ?? "minimal-light");
            setFocusTheme(stored.focusTheme ?? "purple-dream");
            setAmbientTheme(stored.ambientTheme ?? "forest-calm");
            setSoundOn(stored.soundOn ?? true);
            setNotificationSound(stored.notificationSound ?? "bell");
            setQuotesOn(stored.quotesOn ?? true);
            setFocusTimerSettings(
                stored.focusTimerSettings ?? FOCUS_TIMER_DEFAULTS
            );
            setUsername(stored.username ?? "");
            setEmail(stored.email ?? "");
            setLoggedIn(stored.loggedIn ?? false);
        }
    }, []);

    // Save all settings (except note) whenever they change
    useEffect(() => {
        const settings = {
            homeModeTheme,
            focusTheme,
            ambientTheme,
            soundOn,
            notificationSound,
            quotesOn,
            focusTimerSettings,
            username,
            email,
            loggedIn,
        };
        localStorage.setItem("alphapom-settings", JSON.stringify(settings));

        // Dispatch homeThemeUpdated event if needed
        const event = new CustomEvent("homeThemeUpdated", {
            detail: homeModeTheme,
        });
        window.dispatchEvent(event);

    }, [
        homeModeTheme,
        focusTheme,
        ambientTheme,
        soundOn,
        notificationSound,
        quotesOn,
        focusTimerSettings,
        username,
        email,
        loggedIn,
    ]);

    // === Handlers ===
    const handleFocusTimerChange = (field, value) => {
        setFocusTimerSettings((prev) => ({
            ...prev,
            [field]: Math.max(1, Number(value)),
        }));
    };

    // === Render Helpers for various tabs ===

    const THEME_IMAGES = {
        "minimal-light": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvMFQd1vfpUuhziWJdGA6bOB0mfVu6gUcZZg&s",
        "minimal-dark": "https://images.unsplash.com/photo-1532024802178-20dbc87a312a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbCUyMGRhcmt8ZW58MHx8MHx8fDA%3D",
        "purple-dream": "https://img.freepik.com/free-vector/watercolor-galaxy-background_79603-2387.jpg?semt=ais_hybrid&w=740",
        "sunset-glow": "https://slideuplift.com/wp-content/uploads/2024/05/Green-Grass-Sunset-Glow-background-image-0944-768x432.jpg",
        "mountain-mist": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwuPi5yJiThyMjn7PAM92dknE9DFOW3fvAA&s",
        "ocean-breeze": "https://previews.123rf.com/images/man64/man641704/man64170400390/78327950-big-stormy-ocean-wave-blue-water-background.jpg",
        "forest-calm": "https://w0.peakpx.com/wallpaper/186/424/HD-wallpaper-walking-in-the-forest-forest-autumn-relax-nature-3d-walk.jpg",
        "night-sky": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9YVrhuDiWsbAtfmNS5j6ctvAEw1bnrsX-Q&s",
        "desert-gold": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzWNX6lv-CUSk_EDOABEdN7q1ZpTUJs-Y7w&s",
        "city-lights": "https://c4.wallpaperflare.com/wallpaper/147/128/1011/citylights-amusement-park-theme-park-wallpaper-preview.jpg",
        "aerial": "https://t4.ftcdn.net/jpg/06/39/00/87/360_F_639008735_LRi54Wsiibo2cl9nFiSNtbwzVRcAGqxJ.jpg",
        "emerald-forest": "https://maughons.com/cdn/shop/products/forest-nature-landscape-wallpaper-mural-custom-sizes-available-household-wallpaper-maughons-762012-_1_-transformed_1024x1024.jpg?v=1675727648"
    };


    const renderHomeThemes = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-6 justify-center">
            {HOME_MODE_THEMES.map(({ id, label }) => (
                <div
                    key={id}
                    className={`flex flex-col items-center cursor-pointer select-none`}
                    onClick={() => setHomeModeTheme(id)}
                >
                    <div
                        className={`
            w-52 h-52 rounded-3xl border border-white/25
            bg-white/10 backdrop-blur-lg shadow-lg
            overflow-hidden
            transition
            hover:bg-white/20 hover:border-purple-400
            ${homeModeTheme === id ? "border-purple-500 bg-purple-600/30 shadow-purple-700" : ""}
          `}
                    >
                        <img
                            src={THEME_IMAGES[id]}
                            alt={label}
                            className="w-full h-full object-cover rounded-3xl"
                            draggable={false}
                        />
                    </div>
                    <span
                        className={`
            mt-4 text-lg font-semibold
            ${homeModeTheme === id ? "text-purple-400" : "text-white/80"}
          `}
                    >
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );


    const renderQuotesSettings = () => (
        <div className="flex items-center gap-3 max-w-sm">
            <span className="font-medium">Show Motivational Quotes</span>
            <input
                type="checkbox"
                checked={quotesOn}
                onChange={() => setQuotesOn(!quotesOn)}
                className="form-checkbox h-5 w-5 text-purple-600"
            />
        </div>
    );

    const renderSupportTab = () => (
        <div className="max-w-md mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Support & Feedback</h2>
            <p className="text-gray-500 dark:text-gray-400">
                Found a bug or want to request a feature? Email us at{" "}
                <a
                    href="mailto:support@alphapom.com"
                    className="underline hover:text-purple-500"
                >
                    support@alphapom.com
                </a>
            </p>
            <textarea
                placeholder="Write your feedback here..."
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
            />
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                Send Feedback
            </button>
        </div>
    );

    const renderProfileTab = () => (
        <div className="max-w-md mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Profile & Account</h2>
            {!loggedIn ? (
                <>
                    <p className="text-gray-500 dark:text-gray-400">
                        Not registered yet?{" "}
                        <a
                            href="#"
                            className="underline hover:text-purple-500"
                            onClick={() => alert("Redirect to sign up")}
                        >
                            Create an account
                        </a>
                    </p>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            // Simple mock login
                            if (email && username) {
                                setLoggedIn(true);
                                alert("Logged in!");
                            } else {
                                alert("Please enter username and email");
                            }
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                        >
                            Log in
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <p className="text-gray-500 dark:text-gray-400">
                        Logged in as <strong>{username}</strong>
                    </p>
                    <button
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        onClick={() => {
                            setLoggedIn(false);
                            setUsername("");
                            setEmail("");
                            alert("Logged out");
                        }}
                    >
                        Log out
                    </button>
                </>
            )}
        </div>
    );

    // === Main tab content switch ===
    const renderTabContent = () => {
        switch (activeTab) {


            case "Focus Timer":
                return renderFocusTimerSettings();

            case "Sounds":
                return renderSoundsSettings();

            case "Quotes":
                return <Quote />;

            case "Stats":
                // ← Now renders the actual Stats component
                return <Stats />;

            case "Notepad":
                return (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Notepad</h2>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Start typing your notes here..."
                            className="w-full h-64 p-4 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                );

            case "Extras":
                return renderExtrasTab();

            case "Profile":
                return renderProfileTab();

            case "Support & Feedback":
                return renderSupportTab();

            case "Clock":
                return <Clock />;
            default:
                return (
                    <p className="text-gray-600 dark:text-gray-300">
                    </p>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-white dark:bg-black w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-xl flex">
                <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-gray-800 p-4">
                    <div className="text-2xl font-bold mb-6">AlphaPom</div>
                    <nav className="flex flex-col space-y-2 overflow-y-auto max-h-[75vh]">
                        {TABS.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setActiveTab(tab.label)}
                                className={`flex items-center gap-3 py-2 px-3 rounded-md text-left text-sm font-semibold w-full ${activeTab === tab.label
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900"
                                    }`}
                            >
                                <i className={`fas ${tab.icon} w-5 text-center`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 p-8 overflow-y-auto text-gray-900 dark:text-gray-100">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold">{activeTab}</h1>
                        <button
                            onClick={onClose}
                            aria-label="Close Settings"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
                        >
                            &times;
                        </button>
                    </header>
                    <section>{renderTabContent()}</section>
                </main>
            </div>
        </div>
    );
};

export default SettingsModal;
