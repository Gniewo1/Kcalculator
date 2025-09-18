import "./Test.css";
import { useState } from "react";

export default function Test() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    



    return(
        <>
        <h1>Test</h1>
        <h1>{currentYear} {currentMonth}</h1>
        </>
    );
}
