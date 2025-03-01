import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/doctors.css";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch doctors from the database
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/doctors"); // Replace with your API endpoint
        setDoctors(response.data); // Assuming response.data is an array of doctors
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Function to handle the back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to handle the book appointment button click
  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`); // Navigate to the booking page for the specific doctor
  };

  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Registered Doctors</h2>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : doctors.length > 0 ? (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image || "https://cdn-icons-png.flaticon.com/512/6660/6660279.png"} // Use the doctor's image if available, else use a default icon
                alt={`${doctor.name}'s avatar`}
                className="doctor-avatar"
              />
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
                <div className="social-media-handles">
                  <a href={doctor.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon" />
                  </a>
                  <a href={doctor.whatsapp} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="social-icon" />
                  </a>
                  <a href={doctor.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="social-icon" />
                  </a>
                </div>
                <button
                  onClick={() => handleBookAppointment(doctor.id)}
                  className="book-appointment-button"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors registered yet.</p>
      )}
    </div>
  );
};

export default Doctors;