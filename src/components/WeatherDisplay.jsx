import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const WeatherDisplay = ({ weather, isLoading, darkMode, showDetails = true }) => {
  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 p-3 rounded-lg ${darkMode ? 'bg-purple-700' : 'bg-purple-100'}`}>
        <div className="animate-pulse rounded-full bg-purple-300 h-8 w-8"></div>
        <div className="animate-pulse h-4 w-16 rounded bg-purple-300"></div>
      </div>
    );
  }

  if (!weather) return null;

  const getWeatherIcon = () => {
    const main = weather.weather[0].main.toLowerCase();
    const size = 32;

    switch (main) {
      case 'clear': return <WiDaySunny size={size} className="text-yellow-400" />;
      case 'rain': return <WiRain size={size} className="text-blue-400" />;
      case 'clouds': return <WiCloudy size={size} className="text-gray-400" />;
      case 'snow': return <WiSnow size={size} className="text-blue-200" />;
      case 'thunderstorm': return <WiThunderstorm size={size} className="text-purple-400" />;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog': return <WiFog size={size} className="text-gray-300" />;
      default: return <WiDaySunny size={size} className="text-yellow-400" />;
    }
  };

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-purple-700' : 'bg-purple-100'}`}>
      {getWeatherIcon()}
      <div>
        <p className="font-medium">
          {Math.round(weather.main.temp)}°C
          {showDetails && ` | ${weather.weather[0].description}`}
        </p>
        {showDetails && (
          <p className="text-sm opacity-80">{weather.name}</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;