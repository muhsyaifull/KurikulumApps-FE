import React, { useState } from "react";
import InputField from "./InputFiled";
import ButtonLogin from "../Button/ButtonLogin"; 

const FormLogin = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(form).finally(() => setLoading(false));
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
