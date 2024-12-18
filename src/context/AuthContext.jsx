import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode"; // pastikan import ini ada

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	// Memuat token dan user dari localStorage saat aplikasi pertama kali dimuat
	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		if (storedToken) {
			try {
				const decodedToken = jwtDecode(storedToken); // decode token untuk mendapatkan data user
				const currentTime = Date.now() / 1000;

				// Memastikan token tidak expired
				if (decodedToken.exp > currentTime) {
					setToken(storedToken); // set token ke state
					setUser(decodedToken.user); // set user ke state
				} else {
					localStorage.removeItem("token"); // Hapus token jika sudah expired
				}
			} catch (error) {
				console.error("Invalid token:", error);
				localStorage.removeItem("token"); // Hapus token jika invalid
			}
		}
		setLoading(false);
	}, []); // useEffect hanya dijalankan sekali pada render pertama

	const login = async (username, password) => {
		try {
			const response = await axios.post("/auth/login", { username, password });
			const { accessToken, user: userData } = response.data;

			// Set token dan user ke state setelah login sukses
			setToken(accessToken);
			setUser(userData);

			// Simpan token ke localStorage agar tetap ada saat refresh
			localStorage.setItem("token", accessToken);

			return { success: true };
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: error.response?.data?.message || "Login failed",
			};
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
	};

	const value = {
		user,
		token,
		login,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
