import Navbar from "../../components/Navbar/Navbar";
import Calendar from "./Calendar/Calendar";
import { useAuth } from "../../context/AuthContext";

import "./Home.css";

export default function Home() {
  const { isAuthenticated } = useAuth(); 



  return (
    <>
      <Navbar />
        {isAuthenticated ? (
          <div className="home-content">
            <Calendar/>
          </div>
        ) : (
          <h1>Not Auth</h1>
        )}

    </>
  );
}