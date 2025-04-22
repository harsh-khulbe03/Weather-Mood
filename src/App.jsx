import { useState, useEffect } from "react";
import Header from "./components/Header";
import MoodEntryForm from "./components/MoodEntryForm";
import CalendarView from "./components/CalendarView";
import EntriesList from "./components/EntriesList";
import { Toaster } from "react-hot-toast";

function App() {
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState("form");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem("moodJournalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moodJournalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderView = () => {
    switch (viewMode) {
      case "calendar":
        return <CalendarView entries={entries} darkMode={darkMode} />;
      case "list":
        return <EntriesList entries={entries} darkMode={darkMode} />;
      default:
        return <MoodEntryForm addEntry={addEntry} darkMode={darkMode} />;
    }
  };

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "bg-purple-900 text-white" : "bg-purple-50 text-purple-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {renderView()}

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: darkMode ? "#4c1d95" : "#a855f7",
              color: "#fff",
            },
            success: {
              duration: 2000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              duration: 2500,
              iconTheme: {
                primary: "#f87171",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
