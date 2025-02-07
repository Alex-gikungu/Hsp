import React, { useState } from 'react';
import '../styles/pages.css';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
  });

  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Patient registered successfully!');
        setFormData({ name: '', age: '', gender: 'male', phone: '' }); // Reset form
      } else {
        setMessage('Failed to register patient.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="page-container">
      <h2>Register a Patient</h2>
      {message && <p className="message">{message}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter patient's full name" required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter patient's age" required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default PatientRegistration;
