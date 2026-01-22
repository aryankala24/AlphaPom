import ThemeToggle from "./ThemeToggle";

export default function SettingsModal({ onClose }) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Settings</h2>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
