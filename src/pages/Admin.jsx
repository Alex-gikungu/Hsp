import { useState, useEffect } from "react";
import { FaUsers, FaFileAlt, FaCalendarCheck, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [doctorRequests, setDoctorRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch pending doctors from the backend
  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/pending-doctors");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received from backend:", data); // Log the data received

        // Check if data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
          setDoctorRequests(data);
        } else {
          console.warn("No pending doctor requests found or data is not an array.");
        }
      } catch (err) {
        console.error("Error fetching doctor requests:", err);
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchPendingDoctors();
  }, []);

  // Log the doctorRequests state whenever it changes
  useEffect(() => {
    console.log("Doctor requests state updated:", doctorRequests);
  }, [doctorRequests]);

  // Handle approval of a doctor
  const handleApprove = async (doctorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/approve-doctor/${doctorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setDoctorRequests(doctorRequests.filter((doctor) => doctor.id !== doctorId));
      } else {
        throw new Error(`Failed to approve doctor. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
      setError(error.message); // Set error state
    }
  };

  // Handle rejection of a doctor
  const handleReject = async (doctorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reject-doctor/${doctorId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDoctorRequests(doctorRequests.filter((doctor) => doctor.id !== doctorId));
      } else {
        throw new Error(`Failed to reject doctor. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      setError(error.message); // Set error state
    }
  };

  return (
    <main className="dashboard bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100" onClick={() => navigate("/patients")}>
          <FaUsers className="text-blue-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Patients</h3>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100" onClick={() => navigate("/reports")}>
          <FaFileAlt className="text-green-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Reports</h3>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-100" onClick={() => navigate("/appointments-list")}>
          <FaCalendarCheck className="text-yellow-600 text-3xl mb-2" />
          <h3 className="text-xl font-semibold">Appointments</h3>
        </div>
      </div>

      <div className="pending-approvals mt-8">
        <h3 className="text-xl font-semibold mb-4">Pending Doctor Approvals</h3>
        <div className="approval-list">
          {loading ? (
            <p className="text-gray-500">Loading pending doctor requests...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : doctorRequests.length > 0 ? (
            doctorRequests.map((doctor) => (
              <div key={doctor.id} className="approval-item bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                <p className="text-lg">
                  {doctor.name} - {doctor.phone_number}
                </p>
                <div className="approval-buttons flex gap-4">
                  <button
                    className="approve bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                    onClick={() => handleApprove(doctor.id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="reject bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleReject(doctor.id)}
 >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No pending doctor requests available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;