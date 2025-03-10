import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/capturedvitals.css";

const CapturedVitals = ({ userId }) => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserVitals();
    }
  }, [userId]);

  const fetchUserVitals = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/vitals/${userId}`);
      setVitals(response.data);
    } catch (error) {
      setError("Failed to fetch vitals");
      console.error("Error fetching vitals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>My Captured Vitals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : vitals.length === 0 ? (
        <p>No vitals recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Temperature (°C)</th>
              <th>Blood Pressure</th>
              <th>Pulse Rate</th>
              <th>Date Recorded</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((vital) => (
              <tr key={vital.id}>
                <td>{vital.temperature}</td>
                <td>{vital.blood_pressure}</td>
                <td>{vital.pulse_rate}</td>
                <td>{new Date(vital.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CapturedVitals;
