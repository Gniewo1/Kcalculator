import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>

      <ul className="navbar-links">
        <li><Link>Placeholder1</Link></li>
        <li><Link>Placeholder2</Link></li>

        <li>
          {isAuthenticated ? (
            <button className="btn-logout" onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;