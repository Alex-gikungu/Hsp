import React, { useState } from "react";
import axios from "axios";
import "../styles/pages.css";

const CaptureVitals = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    blood_pressure: "",
    temperature: "",
    pulse_rate: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/vitals", formData);
      alert("Vitals recorded successfully!");
      setFormData({ patient_id: "", blood_pressure: "", temperature: "", pulse_rate: "" }); // Clear form
    } catch (error) {
      console.error("Error saving vitals:", error);
      alert("Failed to save vitals.");
    }
  };

  return (
    <div className="page-container">
      <h2>Capture Patient Vitals</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Patient ID:</label>
        <input
          type="text"
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          placeholder="Enter patient ID"
          required
        />
        <label>Temperature (°C):</label>
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          placeholder="Enter temperature"
          required
        />
        <label>Blood Pressure:</label>
        <input
          type="text"
          name="blood_pressure"
          value={formData.blood_pressure}
          onChange={handleChange}
          placeholder="e.g., 120/80"
          required
        />
        <label>Pulse Rate:</label>
        <input
          type="number"
          name="pulse_rate"
          value={formData.pulse_rate}
          onChange={handleChange}
          placeholder="Enter pulse rate"
          required
        />
        <button type="submit" className="btn">
          Save Vitals
        </button>
      </form>
    </div>
  );
};

export default CaptureVitals;
