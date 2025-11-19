const getColorByCalories = (cal, limit) => {
  let diff = limit - cal;

  if (cal === 0) return "white";
  if (diff > 250) return "#a8e6a3";
  if (diff >= 0) return "#ffd59e";
  return "#ff9e9e";
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
  return (
    <button
      onClick={() => navigate(`/calendar/${currentYear}/${currentMonth + 1}/${day}`)}
      style={{
        padding: "10px",
        background: getColorByCalories(calories, caloriesLimitNumber),
        border:
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
            ? "groove red"
            : "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div>{day}</div>
      <div style={{ fontSize: "0.8em", color: "gray" }}>
        {Math.round(calories)} kcal
      </div>
    </button>
  );
};

export default CalendarDay;