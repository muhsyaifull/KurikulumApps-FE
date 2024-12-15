import React from "react";
import { Button } from "antd";

const ButtonLogin = ({ onClick, loading = false }) => {
  return (
    <Button type="primary" onClick={onClick} loading={loading} block>
      Login
    </Button>
  );
};

export default ButtonLogin;
