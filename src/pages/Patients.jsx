import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/patient.css";


const Patients = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/patients") // Replace with your actual backend API endpoint
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);


  // Function to handle the back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };


  return (
    <div className="page-container">
      <h2>Registered Patients</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
       {patients.length > 0 ? (
        patients.map((patient, index) => (
           <tr key={index}>
           <td>{patient.name}</td>  {/* Corrected */}
           <td>{patient.age}</td>
           <td>{patient.gender}</td>
           <td>{patient.phone}</td>  {/* Replace "address" with "phone" if applicable */}
          </tr>
         ))
      ) : (
        <tr>
        <td colSpan="4">No patients registered yet.</td>
        </tr>
        )}
     </tbody>

      </table>

      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default Patients;
