import React from "react";

const Patients = () => {
  const patients = [
    { id: 1, name: "John Doe", age: 30, condition: "Flu" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Asthma" },
    { id: 3, name: "Mark Johnson", age: 45, condition: "Diabetes" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Patients</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full bg-white border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Age</th>
              <th className="p-3 text-left font-semibold">Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`hover:bg-blue-100 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="p-3 border-t border-gray-300">{patient.id}</td>
                <td className="p-3 border-t border-gray-300">{patient.name}</td>
                <td className="p-3 border-t border-gray-300">{patient.age}</td>
                <td className="p-3 border-t border-gray-300">{patient.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
