import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clincs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const Clinics = () => {
  const navigate = useNavigate();

  const clinics = [
    {
      name: "Child Health Clinic",
      description: "Dedicated to newborns and toddlers for regular checkups, immunizations, and growth monitoring.",
      schedule: "Every Monday and Wednesday, 9:00 AM - 1:00 PM",
      image: "https://www.parents.com/thmb/6lnuuqvyQlACn4PGJVKLg2iOUUI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/michaeljung2-e7d4ea80de3e4b8aac93944aa8e1eeb1.jpg",
    },
    {
      name: "Maternal Health Clinic",
      description: "Provides care and counseling for expectant mothers, including prenatal and postnatal services.",
      schedule: "Every Tuesday and Friday, 10:00 AM - 3:00 PM",
      image: "https://reproductiverights.org/wp-content/uploads/2024/04/Midwife-and-pregnant-woman-scaled-aspect-ratio-800-533-scaled.jpeg",
    },
    {
      name: "Vaccination Clinic",
      description: "Focused on administering vaccines for children and adults, ensuring protection from various diseases.",
      schedule: "Every Saturday, 8:00 AM - 12:00 PM",
      image: "https://cdn.who.int/media/images/default-source/health-topics/biologicals/immunization-settlement-child.jpg?sfvrsn=d4a1e93c_19",
    },
    {
      name: "Family Planning Clinic",
      description: "Offers advice and services related to family planning and reproductive health.",
      schedule: "First and Last Thursday of the Month, 1:00 PM - 4:00 PM",
      image: "https://completehealthcare.com/wp-content/uploads/2021/02/happy-family-couch-reading-scaled.jpg",
    },
    {
      name: "Specialized Pediatric Clinic",
      description: "Catered to children with specific health needs and chronic conditions.",
      schedule: "Every 2nd and 4th Friday, 9:00 AM - 2:00 PM",
      image: "https://ukhealthcare.uky.edu/sites/default/files/inline-images/boy-doctor-stethoscope.png",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookAppointment = () => {
    navigate("/appointments");
  };

  return (
    <div className="clinics-container">
      <h2 className="clinics-title">Our Clinics</h2>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
      <div className="clinics-list">
        {clinics.map((clinic, index) => (
          <div className="clinic-card" key={index}>
            <img src={clinic.image} alt={clinic.name} className="clinic-image" />
            <div className="clinic-content">
              <h3 className="clinic-name">{clinic.name}</h3>
              <p className="clinic-description">{clinic.description}</p>
              <p className="clinic-schedule">
                <strong>Schedule:</strong> {clinic.schedule}
              </p>
              <button onClick={handleBookAppointment} className="book-button">
                <FontAwesomeIcon icon={faCalendarCheck} className="icon" /> Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clinics;