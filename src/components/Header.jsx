import { FiCalendar, FiHome, FiMoon, FiSun, FiList } from "react-icons/fi";

const Header = ({ darkMode, toggleDarkMode, viewMode, setViewMode }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Weather Mood
      </h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode("form")}
          className={`p-2 rounded-full ${
            viewMode === "form"
              ? darkMode
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700"
              : darkMode
              ? "text-purple-300"
              : "text-purple-500"
          }`}
          aria-label="Today's entry"
        >
          <FiHome size={20} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-full ${
            viewMode === "list"
              ? darkMode
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700"
              : darkMode
              ? "text-purple-300"
              : "text-purple-500"
          }`}
          aria-label="View all entries"
        >
          <FiList size={20} />
        </button>
        <button
          onClick={() => setViewMode("calendar")}
          className={`p-2 rounded-full ${
            viewMode === "calendar"
              ? darkMode
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700"
              : darkMode
              ? "text-purple-300"
              : "text-purple-500"
          }`}
          aria-label="View calendar"
        >
          <FiCalendar size={20} />
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-purple-700 text-white"
              : "bg-purple-100 text-purple-700"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
