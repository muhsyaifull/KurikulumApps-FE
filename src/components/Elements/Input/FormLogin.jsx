import React, { useState } from "react";
import InputField from "./InputField";
import ButtonLogin from "../Button/ButtonLogin";

const FormLogin = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Meng-handle perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Meng-handle submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    onSubmit(form).finally(() => setLoading(false)); // Panggil fungsi onSubmit dari parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <ButtonLogin onClick={handleSubmit} loading={loading} />
    </form>
  );
};

export default FormLogin;
