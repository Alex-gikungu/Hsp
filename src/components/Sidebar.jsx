import React, { useEffect, useState } from "react";
import { 
  FaTachometerAlt, FaUserPlus, FaNotesMedical, 
  FaHeartbeat, FaPills, FaUserShield, FaUserCircle, FaClipboardList 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [role, setRole] = useState("");

  // Function to fetch and update the role
  const updateRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved user:", user); // Debugging log

    if (user && user.role) {
      setRole(user.role.toLowerCase()); // Ensure lowercase for consistency
      console.log("Set role:", user.role.toLowerCase()); // Debugging log
    } else {
      console.warn("No user role found in localStorage!");
    }
  };

  useEffect(() => {
    updateRole();

    // Listen for role update events
    const handleStorageChange = () => {
      updateRole();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <aside className="sidebar bg-gray-100 h-full p-4 border-r border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Medical Records System</h2>
      <ul className="space-y-4">
        {/* Dashboard */}
        <li>
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Profile */}
        <li>
          <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaUserCircle />
            <span>Profile</span>
          </Link>
        </li>

        {/* Admin & Doctor Links */}
        {(role === "admin" || role === "doctor") && (
          <>
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
          </>
        )}

        {/* Patient Links */}
        {role === "user" && (
          <>
            <li>
              <Link to="/captured-vitals" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <FaHeartbeat />
                <span>Captured Vitals</span>
              </Link>
            </li>
            <li>
              <Link to="/dispensed-medication" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <FaClipboardList />
                <span>Dispensed Medication</span>
              </Link>
            </li>
          </>
        )}

        {/* Reports (Accessible to all) */}
        <li>
          <Link to="/reports" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <FaNotesMedical />
            <span>Reports</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
