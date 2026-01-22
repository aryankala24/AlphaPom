// FloatingToggle.jsx
import { FaMusic } from "react-icons/fa";

const FloatingToggle = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50"
    aria-label="Toggle Sound Player"
  >
    <FaMusic className="text-xl" />
  </button>
);

export default FloatingToggle;
