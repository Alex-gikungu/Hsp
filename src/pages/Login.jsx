import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaInfoCircle } from "react-icons/fa"; // Import icons
import "../styles/login.css"; // Import updated styling

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "", 
    username: "", 
    password: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isAdmin ? "http://localhost:5000/admin/login" : "http://localhost:5000/login";
    const dataToSend = isAdmin
      ? { username: formData.username, password: formData.password }
      : { phoneNumber: formData.phoneNumber, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        setMessage("Login failed. Please check your credentials.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ role: isAdmin ? "admin" : "user" })); // Set user role
      if (!isAdmin) {
        localStorage.setItem("phoneNumber", formData.phoneNumber);
      }
      setMessage("Login successful!");
      navigate(isAdmin ? "/dashboard" : "/profile");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
        {message && <p className="login-message">{message}</p>}

        {isAdmin ? (
          <div className="login-input-group">
            <FaUser className="login-input-icon" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
        ) : (
          <div className="login-input-group">
            <FaPhone className="login-input-icon" />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        )}

        <div className="login-input-group">
          <FaLock className="login-input-icon" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button className="login-btn" type="submit">
          {isAdmin ? "Login as Admin" : "Login"}
        </button>

        <Link to="#" onClick={() => setIsAdmin(!isAdmin)} className="login-link">
          {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
        </Link>

        <Link to="/register" className="login-link">
          Don't have an account? Register
        </Link>
      </form>

      {/* Card Section */}
      <div className="login-card">
        <h3><FaInfoCircle /> Security Tips</h3>
        <ul>
          <li>Never share your password with anyone.</li>
          <li>Use a strong and unique password.</li>
          <li>Ensure you're logging in from a secure network.</li>
        </ul>
        <p>Need help? Contact <a href="mailto:support@example.com">support@example.com</a></p>
      </div>
    </div>
  );
};

export default Login;