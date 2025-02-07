import React from 'react';
import '../styles/pages.css';

const CaptureVitals = () => {
  return (
    <div className="page-container">
      <h2>Capture Patient Vitals</h2>
      <form className="form-container">
        <label>Patient ID:</label>
        <input type="text" placeholder="Enter patient ID" />
        <label>Temperature (°C):</label>
        <input type="number" placeholder="Enter temperature" />
        <label>Blood Pressure:</label>
        <input type="text" placeholder="e.g., 120/80" />
        <button type="submit" className="btn">Save Vitals</button>
      </form>
    </div>
  );
};

export default CaptureVitals;
