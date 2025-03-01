import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/appointmentlist.css"; // Ensure the updated CSS file name matches

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">Scheduled Appointments</h2>

      {appointments.length > 0 ? (
        <div className="appointments-table-wrapper">
          <table className="custom-appointments-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient_id}</td>
                  <td>{appointment.doctor}</td>
                  <td>{new Date(appointment.date).toLocaleString()}</td>
                  <td>{appointment.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-appointments-message">No appointments scheduled.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
