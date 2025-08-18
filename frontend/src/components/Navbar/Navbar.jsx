import React from "react";
import "./Navbar.css";

const Navbar = () => {

const logout = async () => {
  const token = localStorage.getItem("token");

    if (token) {
        try {
        await axios.post(
            "http://127.0.0.1:8000/api/auth/logout/",
            {},
            {
            headers: {
                Authorization: `Token ${token}`,
            },
            }
        );
        } catch (err) {
        console.error("Logout error:", err);
        }
    }

    // usuń token lokalnie
    localStorage.removeItem("token");
    window.location.href = "/login"; // przekierowanie na login
    };

  return (
    <nav className="navbar">
      <button onClick={logout}>Logout</button>
    </nav>
  );
  
};

export default Navbar;