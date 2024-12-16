// src/App.jsx
import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login"; // Import halaman Login
import Dashboard from "./pages/Dashboard"; // Import halaman Dashboard
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SKSU from "./pages/SKSU";

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/sksu"
				element={
					<ProtectedRoute>
						<SKSU />
					</ProtectedRoute>
				}
			/>
		</Routes>
		// <Routes>
		//   <Route path="/"/>
		//   <Route path="/login" element={<Login />} />
		//   <Route path="/dashboard" element={<Dashboard />} />
		// </Routes>
	);
};

export default App;
