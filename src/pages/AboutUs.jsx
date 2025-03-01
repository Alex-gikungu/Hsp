// AboutUs.js
import React from "react";
import "../styles/aboutus.css"; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Kericho Hospital</h1>
      <div className="about-card">
        <section className="about-section">
          <img 
            src="https://t4.ftcdn.net/jpg/00/43/87/71/360_F_43877143_0mHqhaRh36mrEI7u5Y5wEVcFJRiYpiSf.jpg" 
            alt="Kericho Hospital" 
            className="about-image" 
          />
          <div className="about-text">
            <h2>Our History</h2>
            <p>
              Kericho Hospital was established in 2025 with the mission to provide quality healthcare services to the community. Over the years, we have expanded our facilities and services to meet the growing needs of our patients. Our hospital has become a cornerstone of health in the region, serving thousands of patients each year with a commitment to excellence and compassion.
            </p>
            <p>
              We started with a small team of dedicated healthcare professionals and have grown into a full-service hospital equipped with modern technology and a wide range of medical services. Our history is marked by continuous improvement and adaptation to the changing healthcare landscape.
            </p>
          </div>
        </section>

        <section className="location-section reverse">
          <div className="about-text">
            <h2>Location</h2>
            <p>
              We are located at 123 Hospital St, Kericho, Kenya. Our facility is easily accessible by public transport and has ample parking for visitors. The hospital is situated in a serene environment, providing a calm atmosphere for patients and their families.
            </p>
            <p>
              Our strategic location allows us to serve not only the residents of Kericho but also those from surrounding areas. We are committed to being a healthcare provider of choice in the region.
            </p>
          </div>
          <img 
            src="https://media.istockphoto.com/id/465252567/photo/medical-team-working-on-patient-in-emergency-room.jpg?s=612x612&w=0&k=20&c=6qK7iQl_FdxDgT6_BotW0-48880o7TVR_Qaek4hq6ik=" 
            alt="Hospital Staff" 
            className="about-image" 
          />
        </section>

        <section className="services-section">
          <img 
            src="https://media.gettyimages.com/id/114426885/photo/patient-being-rushed-through-hospital-corridor.jpg?s=612x612&w=0&k=20&c=iCsA_qSF1UQUOEc8IITBYjf8tHqgTzj8oGulER4NUoE=" 
            alt="Hospital Services" 
            className="about-image" 
          />
          <div className="about-text">
            <h2>How We Work</h2>
            <p>
              Kericho Hospital operates 24/7, providing emergency services, outpatient care, and inpatient admissions. Our dedicated team of healthcare professionals is committed to delivering compassionate and effective care to all patients. We utilize the latest medical technologies and evidence-based practices to ensure the best outcomes for our patients.
            </p>
            <p>
              Our services include general medicine, surgery, pediatrics, maternity care, and specialized clinics. We also offer health education programs to empower our community with knowledge about health and wellness.
            </p>
          </div>
        </section>

        <section className="admission-section reverse">
          <div className="about-text">
            <h2>Admission Policies</h2>
            <p>
              We admit patients to our wards based on medical necessity. Our admissions team is available to assist with the process and ensure that patients receive the care they need promptly. We prioritize patient safety and comfort during their stay.
            </p>
            <p>
              Our hospital has a streamlined admission process that includes a thorough assessment by our medical staff. We also provide support for patients and their families to navigate the healthcare system effectively.
            </p>
          </div>
          <img 
            src="https://www.hopkinsmedicine.org/-/media/patient-care/images/visiting-patient.jpg" 
            alt="Admission Policies" 
            className="about-image" 
          />
        </section>

        <section className="contact-section">
          <div className="about-text">
            <h2>Contact Us</h2>
            <p>
              For more information, please contact us at <strong>+1 (234) 567-890</strong> or email us at <strong>info@kerichohospital.com</strong>. Our customer service team is available to assist you with inquiries, appointment scheduling, and any other information you may need.
            </p>
            <p>
              We also encourage feedback from our patients and the community to help us improve our services. Your health and satisfaction are our top priorities, and we are here to serve you.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
