/// CalendarHeader is showing Month and Year

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const CalendarHeader = ({ currentMonth, currentYear, onPrev, onNext }) => {
  return (
    <>
      <h2>{monthNames[currentMonth]} {currentYear}</h2>

      <div>
        <button style={{ margin: "10px" }} onClick={onPrev}>◀</button>
        <button style={{ margin: "10px" }} onClick={onNext}>▶</button>
      </div>
    </>
  );
};

export default CalendarHeader;