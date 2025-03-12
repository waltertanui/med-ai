import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Appointments from './pages/Appointments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;