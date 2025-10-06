import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dayCalories, setDayCalories] = useState([]);

  const navigate = useNavigate();

  const monthNames = [
    "Sty", "Lut", "Mar", "Kwi", "Maj", "Cze",
    "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"
  ];

  // Pierwszy i ostatni dzień miesiąca
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 = niedziela, 1 = poniedziałek...

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

  // Pobieranie kalorii dla miesiąca
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/item/eaten-items/monthly_summary/',
          {
            params: { year: currentYear, month: currentMonth + 1 },
            headers: { Authorization: `Token ${token}` }
          }
        );
        setDayCalories(response.data);
      } catch (error) {
        console.error('Error fetching monthly summary:', error);
      }
    };

    fetchData();
  }, [currentMonth, currentYear]); // pobierz przy zmianie miesiąca/roku

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{monthNames[currentMonth]} {currentYear}</h2>

      <div>
        <button style={{ margin: "10px" }} onClick={prevMonth}>◀</button>
        <button style={{ margin: "10px" }} onClick={nextMonth}>▶</button>
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
          <div key={i} style={{ fontWeight: "bold" }}>{d}</div>
        ))}

        {/* Puste miejsca przed pierwszym dniem */}
        {Array((startDay + 6) % 7).fill(null).map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {/* Dni miesiąca */}
        {days.map((day) => {
          const dayData = dayCalories.find(dc => {
            const d = new Date(dc.date);
            return d.getDate() === day &&
                   d.getMonth() === currentMonth &&
                   d.getFullYear() === currentYear;
          });

          const calories = dayData ? dayData.total_calories : 0;

          return (
            <button
              key={day}
              style={{
                padding: "10px",
                background:
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()
                    ? "lightblue"
                    : "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              onClick={() => navigate(`/calendar/${currentYear}/${currentMonth + 1}/${day}`)}
            >
              <div>{day}</div>
              <div style={{ fontSize: "0.8em", color: "gray" }}>
                {calories} kcal
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;