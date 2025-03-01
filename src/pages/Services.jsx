import React, { useState } from "react";
import "../styles/services.css";
import { FaStethoscope, FaSyringe, FaBaby, FaHeartbeat, FaXRay, FaFlask } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded

  const services = [
    {
      id: 1,
      icon: <FaStethoscope />,
      title: "General Check-Up",
      description: "Comprehensive medical examinations to ensure overall health and well-being.",
      details: [
        "Routine physical exams",
        "Blood pressure monitoring",
        "Cholesterol screening",
        "Diabetes screening",
      ],
    },
    {
      id: 2,
      icon: <FaSyringe />,
      title: "Vaccinations",
      description: "Administering vaccines to protect against common diseases.",
      details: [
        "Flu vaccine",
        "COVID-19 vaccine",
        "Hepatitis B vaccine",
        "MMR (Measles, Mumps, Rubella) vaccine",
      ],
    },
    {
      id: 3,
      icon: <FaBaby />,
      title: "Pediatric Care",
      description: "Specialized care for children, including immunizations and growth monitoring.",
      details: [
        "Newborn checkups",
        "Childhood immunizations",
        "Developmental screenings",
        "Nutrition counseling",
      ],
    },
    {
      id: 4,
      icon: <FaHeartbeat />,
      title: "Cardiology Services",
      description: "Heart health assessments and treatments by certified cardiologists.",
      details: [
        "EKG/ECG tests",
        "Stress tests",
        "Echocardiograms",
        "Cardiac rehabilitation",
      ],
    },
    {
      id: 5,
      icon: <FaXRay />,
      title: "Radiology & Imaging",
      description: "State-of-the-art X-ray and ultrasound imaging services.",
      details: [
        "X-rays",
        "Ultrasounds",
        "CT scans",
        "MRI scans",
      ],
    },
    {
      id: 6,
      icon: <FaFlask />,
      title: "Laboratory Tests",
      description: "Accurate diagnostic tests to assist in identifying various conditions.",
      details: [
        "Blood tests",
        "Urine tests",
        "Cholesterol tests",
        "Thyroid function tests",
      ],
    },
  ];

  // Function to handle card click
  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); // Toggle expanded card
  };

  // Function to handle the back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to handle booking
  const handleBookAppointment = (serviceTitle) => {
    navigate(`/appointments?doctor=${encodeURIComponent(serviceTitle)}`); // Navigate to the booking page with the service title
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div
            className={`service-card ${expandedCard === service.id ? "expanded" : ""}`}
            key={service.id}
            onClick={() => handleCardClick(service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            {expandedCard === service.id && (
              <div className="service-details">
                <h4>Services Offered:</h4>
                <ul>
                  {service.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                <button
                  className="book-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card from collapsing
                    handleBookAppointment(service.title);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default Services;
