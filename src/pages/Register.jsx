import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaVenusMars, FaCalendarAlt, FaPhone, FaLock, FaUserTag } from "react-icons/fa";
import "../styles/register.css";

const fullText = `Welcome to Our Healthcare System.

Join our community by creating an account. If you're a patient, you can book appointments and access health resources. If you're a doctor, you can provide services to registered patients.

Who should register?

Patients: Register to access healthcare services, book appointments, and communicate with doctors.
Doctors: Register to offer your medical services. Your account will require admin approval before activation.`;

const Register = () => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      setDisplayedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(typingEffect);
    }, 40);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div className="auth-container">
      {/* Welcome Section with Typewriter Effect */}
      <div className="welcome-section">
        <h1 className="welcome-heading">Welcome to Our Healthcare System</h1>
        <p className="typing-text">{displayedText}</p>
      </div>

      <form className="auth-form">
        <h2>Register</h2>
        <div className="input-group">
          <FaUser />
          <input type="text" name="fullName" placeholder="Full Name" required />
        </div>

        <div className="input-group">
          <FaVenusMars />
          <select name="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <FaCalendarAlt />
          <input type="number" name="age" placeholder="Age" required />
        </div>

        <div className="input-group">
          <FaPhone />
          <input type="text" name="phoneNumber" placeholder="Phone Number" required />
        </div>

        <div className="input-group">
          <FaLock />
          <input type="password" name="password" placeholder="Password" required />
        </div>

        <div className="input-group">
          <FaUserTag />
          <select name="role" required>
            <option value="" disabled>Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <button className="auth-btn" type="submit">Register</button>
        <Link to="/login" className="auth-link">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Register;
