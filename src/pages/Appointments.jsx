import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/appointments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserDoctor, faCalendarDays, faFileLines } from "@fortawesome/free-solid-svg-icons";

const Appointments = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor: "",
    date: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]); // Store doctors from API
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch available doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/doctors"); // Change to your actual endpoint
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Get doctor from query params if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const doctor = queryParams.get("doctor");
    if (doctor) {
      setFormData((prev) => ({ ...prev, doctor }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/appointments", formData);
      alert("Appointment booked successfully!");
      setFormData({ patient_name: "", doctor: "", date: "", reason: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: date.toISOString().slice(0, 16) });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Book an Appointment</h2>
      <button onClick={handleBack} className="back-button">
        Back
      </button>

      <div className="appointment-container">
        <div className="booking-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="patient_name">
                <FontAwesomeIcon icon={faUser} className="icon" /> Patient Name
              </label>
              <input
                type="text"
                id="patient_name"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Updated Doctor Selection */}
            <div className="form-group">
              <label htmlFor="doctor">
                <FontAwesomeIcon icon={faUserDoctor} className="icon" /> Select Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a Doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} - {doc.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">
                <FontAwesomeIcon icon={faCalendarDays} className="icon" /> Date
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reason">
                <FontAwesomeIcon icon={faFileLines} className="icon" /> Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Enter reason for appointment"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </form>
        </div>

        {/* Calendar beside the form */}
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
