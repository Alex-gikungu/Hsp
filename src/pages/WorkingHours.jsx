import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/workingHours.css";

const WorkingHours = () => {
  const navigate = useNavigate();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const doctorsAvailability = {
    "Dr. Smith": "8:00 AM - 4:00 PM",
    "Dr. Johnson": "10:00 AM - 6:00 PM",
    "Dr. Patel": "12:00 PM - 8:00 PM",
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="working-hours-container dark-mode">
      <h2>Working Hours</h2>

      <table className="working-hours-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>8:00 AM - 10:00 PM</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Doctor Availability</h3>
      <table className="working-hours-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(doctorsAvailability).map(([doctor, time], index) => (
            <tr key={index}>
              <td>{doctor}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Break & Emergency Hours</h3>
      <p><strong>Break Time:</strong> 1:00 PM - 2:00 PM</p>
      <p><strong>Emergency Hours:</strong> 24/7 available</p>
      <p><strong>Emergency Contact:</strong> +254 712 345 678</p>
      
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31917.89319830366!2d35.26116730514752!3d-0.36660177630650576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a5778a70a0e19%3A0x9e111200e6923897!2sKericho!5e0!3m2!1sen!2ske!4v1740748871368!5m2!1sen!2ske" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  );
};

export default WorkingHours;
