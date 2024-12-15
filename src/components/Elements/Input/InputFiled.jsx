import React from "react";
import { Input } from "antd";

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default InputField;
