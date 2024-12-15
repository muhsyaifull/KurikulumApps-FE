import React from 'react';
import { Form, Input, Button } from 'antd';

const FormInput = ({ onSubmit, form }) => {
  return (
    <Form form={form} layout="inline" onFinish={onSubmit} style={{ marginBottom: 16 }}>
      <Form.Item
        name="profilLulusan"
        rules={[{ required: true, message: 'Profil Lulusan wajib diisi' }]}
      >
        <Input placeholder="Profil Lulusan" />
      </Form.Item>
      <Form.Item
        name="kualifikasi"
        rules={[{ required: true, message: 'Kualifikasi wajib diisi' }]}
      >
        <Input placeholder="Kualifikasi" />
      </Form.Item>
      <Form.Item
        name="kategori"
        rules={[{ required: true, message: 'Kategori wajib diisi' }]}
      >
        <Input placeholder="Kategori" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Tambah Data
      </Button>
    </Form>
  );
};

export default FormInput;
