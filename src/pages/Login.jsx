import React from "react";
import FormLogin from "../components/Elements/Input/FormLogin";

const Login = () => {
  // Fungsi untuk meng-handle form submit
  const handleSubmitForm = async (data) => {
    console.log("Form Data:", data); // Debug log data input

    try {
      // Kirim data ke API
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login Success:", result);
        alert("Login Berhasil!");
        // Redirect ke halaman dashboard atau simpan token
        localStorage.setItem("token", result.token);
      } else {
        console.error("Login Failed:", result.message);
        alert(`Login Gagal: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Terjadi kesalahan pada server. Coba lagi nanti.");
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
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
      <FormLogin onSubmit={handleSubmitForm} />
    </div>
  );
};

export default Login;
