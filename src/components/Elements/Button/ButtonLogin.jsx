import React from "react";
import { Button, Spin } from "antd";

const ButtonLogin = ({ onClick, loading }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      onClick={onClick}
      style={{ width: "100%" }}
      disabled={loading}
    >
      {loading ? <Spin size="small" /> : "Login"}
    </Button>
  );
};

export default ButtonLogin;
