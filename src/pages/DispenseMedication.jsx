import React from 'react';
import '../styles/pages.css';

const DispenseMedication = () => {
  return (
    <div className="page-container">
      <h2>Dispense Medication</h2>
      <form className="form-container">
        <label>Patient ID:</label>
        <input type="text" placeholder="Enter patient ID" />
        <label>Medication Name:</label>
        <input type="text" placeholder="Enter medication" />
        <label>Dosage:</label>
        <input type="text" placeholder="Enter dosage" />
        <button type="submit" className="btn">Dispense</button>
      </form>
    </div>
  );
};

export default DispenseMedication;
