import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../styles/profile.css"; // Import updated styling

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Fetch user data by phone number
  const fetchUserData = async (phoneNumber) => {
    if (!phoneNumber) {
      setMessage("No phone number found.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/profile/${phoneNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setAppointments(data.appointments || []);
        setProfileImage(data.profile_image || "https://img.icons8.com/?size=100&id=vSr2s7vrG5Hr&format=png&color=000000");
        setMessage("");
      } else {
        setMessage("No user found with this phone number.");
      }
    } catch (error) {
      setMessage("An error occurred while fetching user data.");
      console.error("Error:", error);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber"); // Get phone number from localStorage
    if (phoneNumber) {
      fetchUserData(phoneNumber);
    } else {
      navigate("/login"); // Redirect to login if no phone number is found
    }
  }, [navigate]);

  // Pie chart data
  const chartData = [
    { name: "Completed Appointments", value: 40, color: "#3b82f6" }, // Blue
    { name: "Pending Appointments", value: 20, color: "#10b981" }, // Green
    { name: "Cancelled Appointments", value: 15, color: "#ef4444" }, // Red
    { name: "Rescheduled Appointments", value: 10, color: "#facc15" }, // Yellow
    { name: "Missed Appointments", value: 15, color: "#a855f7" }, // Purple
  ];

  return (
    <div className="profile-page">
      <h2 className="profile-title">User Profile</h2>
      {message && <p className="profile-message">{message}</p>}

      {userData ? (
        <div className="profile-container">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-image-container">
              <img src={profileImage} alt="Profile" className="profile-image" />
            </div>

            <h3 className="profile-section-title">Account Information</h3>
            <div className="profile-info">
              <p><strong>Full Name:</strong> {userData.name}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Phone Number:</strong> {userData.phone_number}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <p><strong>Specialization:</strong> {userData.specialization}</p>
              <p><strong>Approved:</strong> {userData.approved ? "Yes" : "No"}</p>
            </div>

            <h3 className="profile-section-title">Appointments</h3>
            {appointments.length > 0 ? (
              <ul className="profile-appointments">
                {appointments.map((appointment, index) => (
                  <li key={index} className="profile-appointment-item">
                    <strong>Date:</strong> {appointment.date} <br />
                    <strong>Details:</strong> {appointment.details}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="profile-no-appointments">No appointments scheduled.</p>
            )}
          </div>

         {/* Pie Chart */}
<div className="profile-chart">
  <h3 className="chart-title">Appointment Analytics</h3>
  <div className="pie-chart">
    <PieChart width={350} height={350}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
</div>

        </div>
      ) : (
        <div className="profile-input-section">
          <p>No user data available.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
