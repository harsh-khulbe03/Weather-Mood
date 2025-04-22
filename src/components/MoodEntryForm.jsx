import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import MoodSelector from "./MoodSelector";
import WeatherDisplay from "./WeatherDisplay";

const moods = [
  { id: 1, emoji: "😊", label: "Happy", color: "bg-yellow-200" },
  { id: 2, emoji: "😢", label: "Sad", color: "bg-blue-200" },
  { id: 3, emoji: "😡", label: "Angry", color: "bg-red-200" },
  { id: 4, emoji: "😴", label: "Tired", color: "bg-gray-200" },
  { id: 5, emoji: "😍", label: "Excited", color: "bg-pink-200" },
];

const MoodEntryForm = ({ addEntry, darkMode }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      setIsLoading(true);
      const cacheKey = `weather-${lat}-${lon}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 30 * 60 * 1000) {
          setWeather(data);
          setIsLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a498d9f1ca6eb166ceded52516a5c94b&units=metric`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setWeather(data);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Weather fetch failed:", error);

        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { data } = JSON.parse(cached);
          setWeather(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLoading(false);
          if (!localStorage.getItem("weather-fallback")) {
            toast("Weather data unavailable", {
              icon: "⚠️",
              duration: 2000,
            });
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMood) {
      toast.error("Please select a mood");
      return;
    }

    const newEntry = {
      date: currentDate,
      mood: selectedMood,
      note,
      weather,
      lastUpdated: new Date().toISOString(),
    };

    addEntry(newEntry);
    toast.success("Mood entry updated!");
    setNote("");
    setSelectedMood(null);
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-purple-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">{formattedDate}</h2>
        {weather && (
          <WeatherDisplay
            weather={weather}
            isLoading={isLoading}
            darkMode={darkMode}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            How are you feeling today?
          </h3>
          <MoodSelector
            moods={moods}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            darkMode={darkMode}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="note" className="block text-lg font-medium mb-2">
            Add a note (optional)
          </label>
          <textarea
            id="note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              darkMode
                ? "bg-purple-700 border-purple-600 text-white"
                : "bg-white border-purple-200"
            }`}
            placeholder="What's on your mind today?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default MoodEntryForm;
