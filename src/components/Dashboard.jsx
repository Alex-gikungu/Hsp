import { useState } from "react";
import { FaUsers, FaFileAlt, FaCalendarCheck, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the specific route
  };

  return (
    <main className="dashboard bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100"
          onClick={() => handleCardClick("/patients")}
        >
          <FaUsers className="text-blue-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Patients</h3>
          <p className="text-gray-600">100 Registered</p>
        </div>
        <div
          className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100"
          onClick={() => handleCardClick("/reports")}
        >
          <FaFileAlt className="text-green-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-gray-600">50 Generated</p>
        </div>
        <div
          className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100"
          onClick={() => handleCardClick("/appointments")}
        >
          <FaCalendarCheck className="text-yellow-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Appointments</h3>
          <p className="text-gray-600">20 Scheduled</p>
        </div>
        <div
          className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100"
          onClick={() => handleCardClick("/Admin")}
        >
          <FaUserShield className="text-red-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-gray-600">5 Admins</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
