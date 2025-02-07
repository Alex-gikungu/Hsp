import React from 'react';
import '../styles/pages.css';

const PatientRegistration = () => {
  return (
    <div className="page-container">
      <h2>Register a Patient</h2>
      <form className="form-container">
        <label>Full Name:</label>
        <input type="text" placeholder="Enter patient's full name" />
        <label>Age:</label>
        <input type="number" placeholder="Enter patient's age" />
        <label>Gender:</label>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Address:</label>
        <textarea placeholder="Enter address"></textarea>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default PatientRegistration;
