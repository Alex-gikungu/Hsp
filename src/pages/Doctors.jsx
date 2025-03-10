import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/doctors.css";
import { FaInstagram, FaWhatsapp, FaFacebook, FaStar, FaMoneyBillWave, FaClock } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Meet Our Specialists</h2>
      <button onClick={handleBack} className="back-button">Back</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : doctors.length > 0 ? (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image || "https://cdn-icons-png.flaticon.com/512/6660/6660279.png"}
                alt={`${doctor.name}'s avatar`}
                className="doctor-avatar"
              />
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
                <p className="doctor-experience">Experience: {doctor.experience || "5+"} years</p>
                <p className="doctor-rating"><FaStar className="rating-icon" /> {doctor.rating || "4.5"} / 5</p>
                <p className="doctor-fee"><FaMoneyBillWave /> Consultation Fee: ksh{doctor.fee || "50"}</p>
                <p className="doctor-availability"><FaClock /> {doctor.available ? "Available Now" : "Currently Unavailable"}</p>
                <div className="social-media-handles">
                  {doctor.instagram && <a href={doctor.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>}
                  {doctor.whatsapp && <a href={doctor.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="social-icon" /></a>}
                  {doctor.facebook && <a href={doctor.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>}
                </div>
                <button onClick={() => handleBookAppointment(doctor.id)} className="book-appointment-button">
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
