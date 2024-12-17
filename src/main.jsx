import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Import App.jsx
import "antd/dist/reset.css"; // Reset CSS Ant Design
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>
);
