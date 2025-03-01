import { useState, useEffect } from "react";
import { FaUsers, FaFileAlt, FaCalendarCheck, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [doctorRequests, setDoctorRequests] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/pending-doctors")
      .then((res) => res.json())
      .then((data) => setDoctorRequests(data))
      .catch((err) => console.error("Error fetching doctor requests:", err));
  }, []);

  const handleApprove = async (doctorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/approve-doctor/${doctorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setDoctorRequests(doctorRequests.filter((doctor) => doctor.id !== doctorId));
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reject-doctor/${doctorId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDoctorRequests(doctorRequests.filter((doctor) => doctor.id !== doctorId));
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
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

      <div className="pending-approvals">
  <h3>Pending Doctor Approvals</h3>
  <div className="approval-list">
    {doctorRequests.length > 0 ? (
      doctorRequests.map((doctor) => (
        <div key={doctor.id} className="approval-item">
          <p>{doctor.name} - {doctor.phone_number}</p>
          <div className="approval-buttons">
            <button className="approve" onClick={() => handleApprove(doctor.id)}>
              <FaCheck />
            </button>
            <button className="reject" onClick={() => handleReject(doctor.id)}>
              <FaTimes />
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="no-requests">No pending doctor requests.</p>
    )}
  </div>
</div>
</main>

  );
};

export default Admin;