import { useParams } from "react-router-dom";

const DayView = () => {
    const { year, month, day } = useParams();

    return (
        <>
        <h1>
            DayView
        </h1>
        <h2> {year}</h2>
        <h2> {month}</h2>
        <h2> {day}</h2>
        </>
          );
};

export default DayView;