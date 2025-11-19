///// CalendarDay is used in CalendarGrid
import "./Calendar.css";

const getColorClass = (cal, limit) => {
  if (cal === 0) return "day-zero";
  
  let diff = limit - cal;

  if (diff > 250) return "day-green";
  if (diff >= 0) return "day-yellow";
  return "day-red";
};

const CalendarDay = ({
  day,
  calories,
  today,
  currentMonth,
  currentYear,
  caloriesLimitNumber,
  navigate
}) => {
  const isToday =
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  return (
    <button
      className={`calendar-button ${getColorClass(calories, caloriesLimitNumber)} ${
        isToday ? "today" : ""
      }`}
      onClick={() => navigate(`/calendar/${currentYear}/${currentMonth + 1}/${day}`)}
    >
      <div>{day}</div>
      <div className="calendar-day-calories">
        {Math.round(calories)} kcal
      </div>
    </button>
  );
};

export default CalendarDay;