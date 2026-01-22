import { useState } from "react";

const QUOTES = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
  {
    text: "Believe you can and you’re halfway there.",
    author: "Theodore Roosevelt",
  },
];

export default function Quotes() {
  const [index, setIndex] = useState(0);

  const handleNextQuote = () => {
    setIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-100 italic mb-4">
          “{QUOTES[index].text}”
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          — {QUOTES[index].author}
        </p>
        <button
          onClick={handleNextQuote}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}
