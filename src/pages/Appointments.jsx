import React, { useState } from "react";
import axios from "axios";
import "../styles/appointments.css";

const Appointments = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor: "",
    date: "",
    reason: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/appointments", formData);
      alert("Appointment booked successfully!");
      setFormData({ patient_id: "", doctor: "", date: "", reason: "" }); // Clear form
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Book an Appointment</h2>

      <div className="booking-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patient_id">Patient ID</label>
            <input
              type="text"
              id="patient_id"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Doctor</label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
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
            <label htmlFor="reason">Reason</label>
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
    </div>
  );
};

export default Appointments;
