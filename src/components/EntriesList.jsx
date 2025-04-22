import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const EntriesList = ({ entries, darkMode }) => {
  if (entries.length === 0) {
    return (
      <div
        className={`rounded-xl p-6 text-center ${
          darkMode ? "bg-purple-800" : "bg-white"
        }`}
      >
        <p>No entries yet. Add your first mood entry!</p>
      </div>
    );
  }

  const getWeatherIcon = (weather) => {
    if (!weather) return null;

    const main = weather.weather[0].main.toLowerCase();
    const size = 24;

    switch (main) {
      case "clear":
        return <WiDaySunny size={size} className="text-yellow-400" />;
      case "rain":
        return <WiRain size={size} className="text-blue-400" />;
      case "clouds":
        return <WiCloudy size={size} className="text-gray-400" />;
      case "snow":
        return <WiSnow size={size} className="text-blue-200" />;
      case "thunderstorm":
        return <WiThunderstorm size={size} className="text-purple-400" />;
      case "mist":
      case "smoke":
      case "haze":
      case "fog":
        return <WiFog size={size} className="text-gray-300" />;
      default:
        return <WiDaySunny size={size} className="text-yellow-400" />;
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg ${
        darkMode ? "bg-purple-800" : "bg-white"
      }`}
    >
      <div className="divide-y divide-purple-200 dark:divide-purple-700">
        {entries
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((entry, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.mood.emoji}</span>
                  <div>
                    <h3 className="font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    {entry.note && (
                      <p className="text-sm opacity-80">{entry.note}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {entry.weather && (
                    <>
                      <span className="font-medium">
                        {Math.round(entry.weather.main.temp)}°C
                      </span>
                      {getWeatherIcon(entry.weather)}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EntriesList;
