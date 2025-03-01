import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaCalendarCheck, FaClinicMedical, FaUserClock, FaBriefcase, FaSun, FaMoon } from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        {/* <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button> */}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => handleCardClick("/doctors")}>
          <FaUsers className="dashboard-icon" />
          <h3 className="dashboard-card-title">Doctors</h3>
          <p className="dashboard-card-text">15 Available</p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("/appointments")}>
          <FaCalendarCheck className="dashboard-icon" />
          <h3 className="dashboard-card-title">Appointments</h3>
          <p className="dashboard-card-text">20 Scheduled</p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("/clinics")}>
          <FaClinicMedical className="dashboard-icon" />
          <h3 className="dashboard-card-title">Clinics</h3>
          <p className="dashboard-card-text">10 Locations</p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("/working-hours")}>
          <FaUserClock className="dashboard-icon" />
          <h3 className="dashboard-card-title">Working Hours</h3>
          <p className="dashboard-card-text">40 Weekly Hours</p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("/services")}>
          <FaBriefcase className="dashboard-icon" />
          <h3 className="dashboard-card-title">Services</h3>
          <p className="dashboard-card-text">5 Specialties</p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("/aboutus")}>
          <FaFileAlt className="dashboard-icon" />
          <h3 className="dashboard-card-title">Users</h3>
          <p className="dashboard-card-text">View registered Users</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
