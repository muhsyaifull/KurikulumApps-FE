import React from "react";
import FormLogin from "../components/Elements/Input/FormLogin";

const Login = () => {
  const handleSubmitForm = async (data) => {
    console.log("Form Data:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
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
