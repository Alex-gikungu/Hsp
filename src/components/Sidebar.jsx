import React from "react";
import { FaTachometerAlt, FaUserPlus, FaNotesMedical, FaCog, FaHeartbeat, FaPills, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar bg-gray-100 h-full p-4 border-r border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Medical Records System</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaUserShield />
            <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link to="/register-patient" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaUserPlus />
            <span>Register Patient</span>
          </Link>
        </li>
        <li>
          <Link to="/capture-vitals" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaHeartbeat />
            <span>Capture Vitals</span>
          </Link>
        </li>
        <li>
          <Link to="/dispense-medication" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaPills />
            <span>Dispense Medication</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaNotesMedical />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaCog />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
