import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/reports.css"; // Import the styling
import { CSVLink } from "react-csv"; // For CSV export
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure this is imported

const Reports = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [timeFilter, setTimeFilter] = useState("all"); // Time filter state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page

  // User-specific data
  const [userVitals, setUserVitals] = useState([]); // User-specific vitals
  const [userMedications, setUserMedications] = useState([]); // User-specific medications
  const [userDoctor, setUserDoctor] = useState(null); // Doctor who treated the user

  // Get the logged-in user's ID from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const userRole = JSON.parse(localStorage.getItem("user"))?.role; // Get user role

  useEffect(() => {
    // Fetch appointments
    axios
      .get("http://localhost:5000/appointments")
      .then((response) => {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      })
      .catch((error) => console.error("Error fetching appointments:", error));

    // Fetch patients
    axios
      .get("http://localhost:5000/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));

    // Fetch doctors
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));

    // Fetch user-specific data if the user is a regular user
    if (userRole === "user" && userId) {
      fetchUserData(userId);
    }
  }, [userRole, userId]);

  // Fetch user-specific data
  const fetchUserData = async (userId) => {
    try {
      const vitalsResponse = await axios.get(`http://localhost:5000/vitals/${userId}`);
      setUserVitals(vitalsResponse.data);

      const medicationsResponse = await axios.get(`http://localhost:5000/dispensed-medications/${userId}`);
      setUserMedications(medicationsResponse.data);

      const doctorResponse = await axios.get(`http://localhost:5000/doctor/${userId}`);
      setUserDoctor(doctorResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Filter appointments based on time filter
  useEffect(() => {
    let filtered = appointments;
    const now = new Date();

    if (timeFilter === "daily") {
      filtered = appointments.filter(
        (app) => new Date(app.date).toDateString() === now.toDateString()
      );
    } else if (timeFilter === "weekly") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      filtered = appointments.filter(
        (app) => new Date(app.date) >= startOfWeek && new Date(app.date) <= endOfWeek
      );
    } else if (timeFilter === "monthly") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filtered = appointments.filter(
        (app) => new Date(app.date) >= startOfMonth && new Date(app.date) <= endOfMonth
      );
    }

    setFilteredAppointments(filtered);
  }, [timeFilter, appointments]);

  // Handle search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = appointments.filter((app) =>
      app.patientName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <select onChange={(e) => setTimeFilter(e.target.value)} value={timeFilter}>
        <option value="all">All Time</option>
        <option value="daily">Today</option>
        <option value="weekly">This Week</option>
        <option value="monthly">This Month</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>Vitals</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          {userRole === "user" ? (
            <tr>
              <td>{userId}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{userDoctor?.name}</td>
              <td>{userVitals.map(v => `${v.type}: ${v.value}`).join(", ")}</td>
              <td>{userMedications.map(m => m.medicationName).join(", ")}</td>
            </tr>
          ) : (
            currentItems.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.vitals}</td>
                <td>{appointment.medications}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <CSVLink data={currentItems} filename={"reports.csv"}>Export to CSV</CSVLink>
      <button onClick={() => {
        const doc = new jsPDF();
        doc.autoTable({ html: 'table' });
        doc.save('reports.pdf');
      }}>Export to PDF</button>
    </div>
  );
};

export default Reports; 
