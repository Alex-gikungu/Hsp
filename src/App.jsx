import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Admin from './pages/Admin';
import PatientRegistration from './pages/PatientRegistration';
import Reports from './pages/Reports';
import CaptureVitals from './pages/CaptureVitals';
import DispenseMedication from './pages/DispenseMedication';
import SystemConfig from './pages/SystemConfig';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/capture-vitals" element={<CaptureVitals />} />
        <Route path="/dispense-medication" element={<DispenseMedication />} />
        <Route path="/system-config" element={<SystemConfig />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
};

export default App;
