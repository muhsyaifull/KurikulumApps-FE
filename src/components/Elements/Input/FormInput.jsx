import React from "react";
import { Form, Input, Button } from "antd";

const FormInput = ({ onSubmit, form }) => {
  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="inline">
      <Form.Item name="profilLulusan" label="Profil Lulusan" rules={[{ required: true }]}>
        <Input placeholder="Masukkan Profil Lulusan" />
      </Form.Item>

      <Form.Item name="kualifikasi" label="Kualifikasi" rules={[{ required: true }]}>
        <Input placeholder="Masukkan Kualifikasi" />
      </Form.Item>

      <Form.Item name="kategori" label="Kategori" rules={[{ required: true }]}>
        <Input placeholder="Masukkan Kategori" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tambah Data
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormInput;
