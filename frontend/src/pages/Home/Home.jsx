import Navbar from "../../components/Navbar/Navbar";
import Calendar from "./Calendar/Calendar";

import "./Home.css";

export default function Home() {


  return (
    <>
      <Navbar />
      <div className="home-content">
      <Calendar />
      </div>
    </>
  );
}