import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import "../styles/navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("phoneNumber"); // Remove phone number
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h1>Kericho Hsp Medical System</h1>
      <div className="actions">
        <div className="nav-links">
          {/* Show Login and Register buttons only if the user is not logged in */}
          {!isLoggedIn && (
            <>
              <a href="/login" className="nav-btn">Login</a>
              <a href="/register" className="nav-btn">Register</a>
            </>
          )}
        </div>
        {/* Show Logout button and user info only if the user is logged in */}
        {isLoggedIn && (
          <div className="user-actions">
            <span>Admin</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Dark Mode Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
