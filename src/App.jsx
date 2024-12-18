// src/App.jsx
import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login"; // Import halaman Login
import Dashboard from "./pages/Dashboard"; // Import halaman Dashboard
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SKSU from "./pages/SKSU";
import BenchCurriculum from "./pages/analisisKonsideran/editBenchCurriculum"
import ViewBenchCurriculum from "./pages/analisisKonsideran/viewBenchCurriculum";
import KKNI from "./pages/KKNI";
import VMT from "./pages/VMT";

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
			<Route
				path="/bench-curriculum"
				element={
					<ProtectedRoute>
						<ViewBenchCurriculum />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/edit-bench-curriculum"
				element={
					<ProtectedRoute>
						<BenchCurriculum />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/kkni"
				element={
					<ProtectedRoute>
						<KKNI />
					</ProtectedRoute>
				}
			/>
			<Route path="visi-misi-tujuan" element={<VMT />} />
		</Routes>
	);
};

export default App;
