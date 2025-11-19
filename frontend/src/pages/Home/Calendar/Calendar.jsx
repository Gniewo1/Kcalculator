/// Calendar main file

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Calendar.css";

import CalendarHeader from "./CalendarHeader";
import CaloriesLimitPanel from "./CaloriesLimitPanel";
import CalendarGrid from "./CalendarGrid";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [dayCalories, setDayCalories] = useState([]);
  const [caloriesLimit, setCaloriesLimit] = useState([]);
  const [caloriesLimitNumber, setCaloriesLimitNumber] = useState(0);

  const [editing, setEditing] = useState(false);
  const [newCalories, setNewCalories] = useState("");

  const navigate = useNavigate();

  // ----------------------------------------------
  // Month navigation
  // ----------------------------------------------
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

  // ----------------------------------------------
  // Save calories limit
  // ----------------------------------------------
  const saveCaloriesLimit = async () => {
    try {
      const formattedMonth = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-01`;

      const token = localStorage.getItem("token");
      let response;

      if (caloriesLimit.length > 0) {
        const id = caloriesLimit[0].id;
        response = await axios.patch(
          `http://localhost:8000/auth/calories-limit/${id}/`,
          { calories_limit: newCalories },
          {
            headers: { Authorization: `Token ${token}` }
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8000/auth/calories-limit/`,
          { calories_limit: newCalories, month: formattedMonth },
          {
            headers: { Authorization: `Token ${token}` }
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setCaloriesLimit([response.data]);
        setCaloriesLimitNumber(Number(response.data.calories_limit));
        setEditing(false);
      }
    } catch (error) {
      console.error("Error saving calories limit:", error);
    }
  };

  // ----------------------------------------------
  // Fetch data
  // ----------------------------------------------
  useEffect(() => {
    const fetchCaloriesLimit = async () => {
      const month = new Date(currentYear, currentMonth, 2);
      const monthString = month.toISOString().split("T")[0];
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:8000/auth/calories-limit/",
          {
            params: { month: monthString },
            headers: { Authorization: `Token ${token}` }
          }
        );
        setCaloriesLimit(response.data);
        setCaloriesLimitNumber(
          response.data.length > 0 ? Number(response.data[0].calories_limit) : 0
        );
      } catch (error) {
        console.error("Error fetching calories limit:", error);
      }
    };

    const fetchDayCalories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8000/item/eaten-items/monthly_summary/",
          {
            params: { year: currentYear, month: currentMonth + 1 },
            headers: { Authorization: `Token ${token}` }
          }
        );
        setDayCalories(response.data);
      } catch (error) {
        console.error("Error fetching daily calories:", error);
      }
    };

    fetchCaloriesLimit();
    fetchDayCalories();
  }, [currentMonth, currentYear]);

  /////////////////////////////////////////////////////////////////////////////////////// Return
  return (
    <div className="calendar-container">
    <div style={{ textAlign: "center" }}>
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrev={prevMonth}
        onNext={nextMonth}
      />

      <CaloriesLimitPanel
        caloriesLimit={caloriesLimit}
        editing={editing}
        newCalories={newCalories}
        onEdit={() => {
          setEditing(true);
          setNewCalories(
            caloriesLimit.length > 0 ? caloriesLimit[0].calories_limit : ""
          );
        }}
        onCancel={() => setEditing(false)}
        onSave={saveCaloriesLimit}
        onChange={(e) => setNewCalories(e.target.value)}
      />
      <div className="grid-container">
      <CalendarGrid
        currentMonth={currentMonth}
        currentYear={currentYear}
        today={today}
        dayCalories={dayCalories}
        caloriesLimitNumber={caloriesLimitNumber}
        navigate={navigate}
      />
      </div>
    </div>
    </div>
  );
};

export default Calendar;