//// Grid for CalendarDays buttons

import CalendarDay from "./CalendarDay";

const CalendarGrid = ({
  currentMonth,
  currentYear,
  today,
  dayCalories,
  caloriesLimitNumber,
  navigate
}) => {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = (firstDay.getDay() + 6) % 7;

  const days = [...Array(daysInMonth).keys()].map(i => i + 1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        marginTop: "20px",
      }}
    >
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
        <div key={d} style={{ fontWeight: "bold", color: "white" }}>{d}</div>
      ))}

      {/* Empty slots */}
      {Array(startDay).fill(null).map((_, i) => (
        <div key={"empty-" + i}></div>
      ))}

      {days.map((day) => {
        const data = dayCalories.find(dc => {
          const d = new Date(dc.date);
          return (
            d.getDate() === day &&
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
          );
        });

        const calories = data ? data.total_calories : 0;

        return (
          <CalendarDay
            key={day}
            day={day}
            calories={calories}
            today={today}
            currentMonth={currentMonth}
            currentYear={currentYear}
            caloriesLimitNumber={caloriesLimitNumber}
            navigate={navigate}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;