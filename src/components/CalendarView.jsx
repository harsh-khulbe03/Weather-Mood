import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CalendarView = ({ entries, darkMode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // In CalendarView.jsx, modify the renderCalendar function:
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Group entries by date to get the latest one for each day
    const entriesByDate = {};
    entries.forEach((entry) => {
      entriesByDate[entry.date] = entry;
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dayEntry = entriesByDate[dateStr];

      days.push(
        <div
          key={day}
          className={`h-16 p-1 border ${
            darkMode ? "border-purple-700" : "border-purple-100"
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">{day}</span>
            {dayEntry && <span className="text-xl">{dayEntry.mood.emoji}</span>}
          </div>
          {dayEntry && dayEntry.weather && (
            <div className="text-xs mt-1">
              {Math.round(dayEntry.weather.main.temp)}°C
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-purple-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigateMonth("prev")}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-purple-700 text-white"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          <FiChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">
          {months[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => navigateMonth("next")}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-purple-700 text-white"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={`text-center font-medium py-2 ${
              darkMode ? "text-purple-300" : "text-purple-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
    </div>
  );
};

export default CalendarView;
