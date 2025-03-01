import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages.css";

const DispenseMedication = ({ userRole }) => {
  const [formData, setFormData] = useState({
    patient_id: "",
    medication_name: "",
    dosage: "",
  });

  const [medicationsList, setMedicationsList] = useState([]);

  // Fetch dispensed medications for doctors and admins
  useEffect(() => {
    if (userRole === "doctor" || userRole === "admin") {
      fetchMedications();
    }
  }, [userRole]);

  const fetchMedications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dispense_medication");
      setMedicationsList(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
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
      const response = await axios.post("http://localhost:5000/dispense_medication", formData);
      alert("Medication dispensed successfully!");
      setFormData({ patient_id: "", medication_name: "", dosage: "" }); // Clear form
      if (userRole === "doctor" || userRole === "admin") {
        fetchMedications(); // Refresh the list
      }
    } catch (error) {
      console.error("Error dispensing medication:", error);
      alert("Failed to dispense medication.");
    }
  };

  return (
    <div className="page-container">
      <h2>Dispense Medication</h2>
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
        <label>Medication Name:</label>
        <input
          type="text"
          name="medication_name"
          value={formData.medication_name}
          onChange={handleChange}
          placeholder="Enter medication"
          required
        />
        <label>Dosage:</label>
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          placeholder="Enter dosage"
          required
        />
        <button type="submit" className="btn">
          Dispense
        </button>
      </form>

      {(userRole === "doctor" || userRole === "admin") && (
        <div className="medications-list">
          <h3>Dispensed Medications</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Medication Name</th>
                <th>Dosage</th>
              </tr>
            </thead>
            <tbody>
              {medicationsList.map((medication) => (
                <tr key={medication.id}>
                  <td>{medication.patient_id}</td>
                  <td>{medication.medication_name}</td>
                  <td>{medication.dosage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DispenseMedication;