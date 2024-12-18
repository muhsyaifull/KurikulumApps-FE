import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

const FormInputIpteks = ({ onSubmit, form }) => {
  const onFinish = (values) => {
    console.log("Form Values:", values);
    onSubmit({ ...values, key: Date.now() });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginBottom: "20px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="ilmuPengetahuan"
            label="Ilmu Pengetahuan"
            rules={[{ required: true, message: "Masukkan Ilmu Pengetahuan!" }]}
          >
            <Input placeholder="Contoh: Fisika" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="teknologi"
            label="Teknologi"
            rules={[{ required: true, message: "Masukkan Teknologi!" }]}
          >
            <Input placeholder="Contoh: AI, Robotics" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="seni"
            label="Seni"
            rules={[{ required: true, message: "Masukkan Seni!" }]}
          >
            <Input placeholder="Contoh: Lukisan, Musik" />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Tambah Data
      </Button>
    </Form>
  );
};

export default FormInputIpteks;
