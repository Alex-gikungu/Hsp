import React, { useState } from "react";
import "../styles/services.css";
import { FaStethoscope, FaSyringe, FaBaby, FaHeartbeat, FaXRay, FaFlask } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null); 

  const services = [
    {
      id: 1,
      icon: <FaStethoscope />,
      title: "General Check-Up",
      description: "Comprehensive medical examinations to ensure overall health and well-being.",
      image: "https://media.gettyimages.com/id/1869998947/photo/senior-medical-check-up.jpg?s=612x612&w=0&k=20&c=lPCDItQdbLpDp-2yfBDa-l6h7exbWTLQ9k1v8uJgLG0=", // Add image for visual representation
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
      image: "https://www.immunize.org/wp-content/uploads/clinical/image-library/vaccination/vaccination-1-scaled.jpg",
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
      image: "https://media.istockphoto.com/id/1130456907/photo/baby-39-s-visit-to-the-doctor.jpg?s=612x612&w=0&k=20&c=KQkSTGUYaG2x-XbaSW5BfVYUWgTcI5i-3TcABMOJJoc=",
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
      image: "https://img.freepik.com/premium-photo/modern-medicine-technology-cardiology-mixed-media_641298-15424.jpg?semt=ais_hybrid",
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
      image: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/12/my00299_im03554_c7_radiationthu_jpg.jpg",
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
      image: "https://images.theconversation.com/files/510360/original/file-20230215-28-e6jp0p.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
      details: [
        "Blood tests",
        "Urine tests",
        "Cholesterol tests",
        "Thyroid function tests",
      ],
    },
  ];

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id); 
  };

  const handleBack = () => {
    navigate(-1); 
  };

  const handleBookAppointment = (serviceTitle) => {
    navigate(`/appointments?doctor=${encodeURIComponent(serviceTitle)}`);
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
            <img src={service.image} alt={service.title} className="service-image" />
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
                    e.stopPropagation(); 
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
