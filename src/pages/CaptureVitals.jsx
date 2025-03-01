import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages.css";

const CaptureVitals = ({ userRole }) => {
  const [formData, setFormData] = useState({
    patient_id: "",
    blood_pressure: "",
    temperature: "",
    pulse_rate: "",
  });

  const [vitalsList, setVitalsList] = useState([]);

  // Fetch vitals for doctors and admins
  useEffect(() => {
    if (userRole === "doctor" || userRole === "admin") {
      fetchVitals();
    }
  }, [userRole]);

  const fetchVitals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vitals");
      setVitalsList(response.data);
    } catch (error) {
      console.error("Error fetching vitals:", error);
    }
  };

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
      if (userRole === "doctor" || userRole === "admin") {
        fetchVitals(); // Refresh the list
      }
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

      {(userRole === "doctor" || userRole === "admin") && (
        <div className="vitals-list">
          <h3>Recorded Vitals</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Temperature (°C)</th>
                <th>Blood Pressure</th>
                <th>Pulse Rate</th>
              </tr>
            </thead>
            <tbody>
              {vitalsList.map((vital) => (
                <tr key={vital.id}>
                  <td>{vital.patient_id}</td>
                  <td>{vital.temperature}</td>
                  <td>{vital.blood_pressure}</td>
                  <td>{vital.pulse_rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CaptureVitals;