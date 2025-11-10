import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dayCalories, setDayCalories] = useState([]);
  const [caloriesLimit, setCaloriesLimit] = useState([]);
  const [editing, setEditing] = useState(false); // if user changing calories limit
  const [newCalories, setNewCalories] = useState(""); // new calories limit

  const navigate = useNavigate();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
    setEditing(false);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear(y => y + 1);
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(true);
    setNewCalories(caloriesLimit.length > 0 ? caloriesLimit[0].calories_limit : "");
  };

  const handleSaveClick = () => {
    console.log("Nowy limit kalorii:", newCalories);
    saveCaloriesLimit();
    setEditing(false);
    };

  //////// Changing calorieelimit function
  const saveCaloriesLimit = async () => {
    try {

      //// Date to add to new calories limit
      const formattedMonth = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-01`;

      
      const token = localStorage.getItem("token");
      let response;

      if (caloriesLimit.length > 0) {
        // już istnieje → update
        const id = caloriesLimit[0].id;
        response = await axios.patch(
          `http://localhost:8000/auth/calories-limit/${id}/`,
          { calories_limit: newCalories },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        // brak limitu → create
        response = await axios.post(
          `http://localhost:8000/auth/calories-limit/`,
          { calories_limit: newCalories, month: formattedMonth },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setCaloriesLimit([response.data]); // aktualizuj stan
        setEditing(false);
      }
    } catch (error) {
      console.error("Błąd zapisu limitu kalorii:", error.response ? error.response.data : error.message);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////// USE EFFECT
  useEffect(() => {
    const fetchCaloriesLimit = async () => {
      const month = new Date(currentYear, currentMonth, 2);
      const monthString = month.toISOString().split("T")[0];
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/calories-limit/",
          {
            params: {  month: monthString  }, 
            headers: { Authorization: `Token ${token}` },
          }
        );
        setCaloriesLimit(response.data);
      } catch (error) {
        console.error("Error fetching calories limit:", error);
      }
    };

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
    fetchCaloriesLimit();
  }, [currentMonth, currentYear]);




  /////////////////////////////////////////////////////////////////////////////////////////////////// RETURN
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{monthNames[currentMonth]} {currentYear}</h2>

      {/* Limit kalorii */}
      {caloriesLimit.length > 0 || editing ? (
        <>
          {!editing ? (
            <>
              <h2>Calories limit: {Math.round(caloriesLimit[0].calories_limit)} kcal</h2>
              <button onClick={handleEditClick}>Edit calories limit</button>
            </>
          ) : (
            <>
              <input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
            </>
          )}
        </>
      ) : (
        <button onClick={handleEditClick}>Add calories limit</button>
      )}

      {/* Nawigacja miesięcy */}
      <div>
        <button style={{ margin: "10px" }} onClick={prevMonth}>◀</button>
        <button style={{ margin: "10px" }} onClick={nextMonth}>▶</button>
      </div>

      {/* Siatka dni */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {/* Dni tygodnia */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
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
                {Math.round(calories)} kcal
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;