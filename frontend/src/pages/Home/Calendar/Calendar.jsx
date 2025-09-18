import { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Pierwszy i ostatni dzień miesiąca
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate(); // liczba dni w miesiącu
  const startDay = firstDay.getDay(); // dzień tygodnia (0 = niedziela, 1 = poniedziałek, ...)

  // Tworzymy tablicę dni
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Obsługa zmiany miesiąca
  const prevMonth = () => {
    setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear(y => y - 1);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear(y => y + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {today.toLocaleString("default", { month: "long" })} {currentYear}
      </h2>
      <div>
        <button onClick={prevMonth}>◀</button>
        <button onClick={nextMonth}>▶</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {/* Dni tygodnia */}
        {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((d, i) => (
          <div key={i} style={{ fontWeight: "bold" }}>
            {d}
          </div>
        ))}

        {/* Puste miejsca przed pierwszym dniem */}
        {Array((startDay + 6) % 7)
          .fill(null)
          .map((_, i) => (
            <div key={"empty-" + i}></div>
          ))}

        {/* Dni miesiąca */}
        {days.map((day) => (
          <button
            key={day}
            style={{
              padding: "10px",
              background: day === today.getDate() &&
                         currentMonth === today.getMonth() &&
                         currentYear === today.getFullYear()
                         ? "lightblue"
                         : "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => alert(`Kliknięto dzień ${day}`)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;