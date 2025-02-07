import React, { useState } from "react";
import "../styles/appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { date: "2025-02-07", time: "10:00 AM", patient: "John Doe" },
    { date: "2025-02-08", time: "02:00 PM", patient: "Jane Smith" },
    { date: "2025-02-09", time: "11:30 AM", patient: "Michael Brown" },
  ]);
  const [formData, setFormData] = useState({ date: "", time: "", patient: "" });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.time && formData.patient) {
      setAppointments([...appointments, formData]);
      setFormData({ date: "", time: "", patient: "" }); // Clear form
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Appointments</h2>

      {/* Booking Form */}
      <div className="booking-form">
        <h3>Book an Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient">Patient Name</label>
            <input
              type="text"
              id="patient"
              name="patient"
              placeholder="Enter your name"
              value={formData.patient}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Book Appointment
          </button>
        </form>
      </div>

      {/* Appointments Table */}
      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
