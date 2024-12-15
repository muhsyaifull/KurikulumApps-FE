// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Import halaman Login
import Dashboard from "./pages/Dashboard"; // Import halaman Dashboard

const App = () => {
  return (
    <Routes>
      <Route path="/"/>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
