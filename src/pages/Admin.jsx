import React, { useState } from 'react';
import '../styles/pages.css';

const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Alice Brown', role: 'Moderator' },
  ]);

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Admin section where you can manage system users and configurations.</p>
      
      {/* Analytics Section */}
      <div className="analytics-section">
        <h3>System Analytics</h3>
        <div className="analytics-cards">
          <div className="card">
            <h4>Total Users</h4>
            <p>{users.length}</p>
          </div>
          <div className="card">
            <h4>Active Sessions</h4>
            <p>5</p> {/* Replace with real data */}
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="user-management">
        <h3>Manage Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => alert(`Edit ${user.name}`)}>Edit</button>
                  <button onClick={() => alert(`Delete ${user.name}`)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
