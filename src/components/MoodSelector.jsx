const MoodSelector = ({ moods, selectedMood, setSelectedMood, darkMode }) => {
    return (
      <div className="grid grid-cols-5 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => setSelectedMood(mood)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
              selectedMood?.id === mood.id
                ? `${mood.color} scale-105 shadow-md ${darkMode ? 'shadow-purple-900' : 'shadow-purple-200'}`
                : darkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-purple-100 hover:bg-purple-50'
            }`}
          >
            <span className="text-3xl mb-1">{mood.emoji}</span>
            <span className="text-sm">{mood.label}</span>
          </button>
        ))}
      </div>
    );
  };
  
  export default MoodSelector;