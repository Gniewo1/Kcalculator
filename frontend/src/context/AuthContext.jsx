import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [user, setUser] = useState(null);

  // checking authenticaton
  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const res = await axios.get("/auth/check-auth/", {
        headers: { Authorization: `Token ${token}` },
      });

      if (res.status === 200) {
        setIsAuthenticated(true);
        setUser(res.data?.user || null);
        return true;
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }

    return false;
  };

  // Logout
  const logout = async () => {
    const token = localStorage.getItem("token");

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
    } catch (e) {
      console.error("Logout error:", e);
    }

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };


  useEffect(() => {
    checkLogin();
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);