import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dispensedmedication.css";

const UserMedications = ({ userId }) => {
  const [medications, setMedications] = useState([]);

  // Fetch user's dispensed medications on page load
  useEffect(() => {
    if (userId) {
      fetchUserMedications();
    }
  }, [userId]);

  const fetchUserMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/dispense_medication/${userId}`);
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching user medications:", error);
    }
  };

  return (
    <div className="page-container">
      <h2>Your Dispensed Medications</h2>

      {medications.length === 0 ? (
        <p className="no-data">No medications found for your account.</p>
      ) : (
        <div className="medications-list">
          <table>
            <thead>
              <tr>
                <th>Medication Name</th>
                <th>Dosage</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med) => (
                <tr key={med.id}>
                  <td>{med.medication_name}</td>
                  <td>{med.dosage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserMedications;
