import React, { useState } from "react";
import FormLogin from "../components/Elements/Input/FormLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	// Fungsi untuk meng-handle form submit
	const handleSubmitForm = async (data) => {
		const result = await login(data.username, data.password);
		if (result.success) {
			navigate("/dashboard");
		} else {
			setError(result.message);
		}
	};

	return (
		<div
			style={{
				width: 350,
				margin: "50px auto",
				padding: 24,
				boxShadow: "0 0 10px rgba(0,0,0,0.1)",
				borderRadius: 8,
				background: "#fff",
			}}>
			<h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
			<FormLogin onSubmit={handleSubmitForm} />
		</div>
	);
};

export default Login;
