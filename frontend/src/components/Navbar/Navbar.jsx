import "./Navbar.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import {  useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  function redirect() {
    navigate('/login');
  }

  useEffect(() => {
    const verifyLogin = async () => {
        const loggedIn = await checkLogin();
        setIsAuthenticated(loggedIn);
      };
    verifyLogin();
    }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");

      if (token) {
          try {
          await axios.post(
              "http://127.0.0.1:8000/auth/logout/",
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

      localStorage.removeItem("token");
      window.location.href = "/login"; // przekierowanie na login
      };

    /// Check if user is login

  async function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await axios.get("/auth/check-auth/", {
        headers: { Authorization: `Token ${token}` },
      });
      return res.status === 200;
    } catch {
      return false;
    }
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link>Placeholder1</Link>
        </li>
        <li>
          <Link>Placeholder2</Link>
        </li>
        <li>
              {isAuthenticated ? (
        <button className="btn-logout" onClick={logout}>Logout</button>
      ) :
      (
        <Link to="/login">Login</Link>
      )}
        
        </li>
      </ul>

      
    </nav>
  );
  
};

export default Navbar;