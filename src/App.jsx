import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Admin from "./pages/Admin";
import PatientRegistration from "./pages/PatientRegistration";
import Reports from "./pages/Reports";
import CaptureVitals from "./pages/CaptureVitals";
import DispenseMedication from "./pages/DispenseMedication";
import SystemConfig from "./pages/SystemConfig";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";        
import Register from "./pages/Register";  
import Profile from "./pages/Profile";    
import WorkingHours from "./pages/WorkingHours";
import Clinics from "./pages/Clincs";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import AppointmentsList from "./pages/AppointmentsList";
import Footer from "./pages/Footer";
import Chatbot from "./pages/Chatbot";

import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  // Manage theme state (light/dark)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      {/* Pass theme toggle to Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} /> 
      <Sidebar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/capture-vitals" element={<CaptureVitals />} />
        <Route path="/dispense-medication" element={<DispenseMedication />} />
        <Route path="/system-config" element={<SystemConfig />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/register" element={<Register />} /> 
        <Route path="/profile" element={<Profile />} />    
        <Route path="/working-hours" element={<WorkingHours />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/appointments-list" element={<AppointmentsList />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
};

export default App;
