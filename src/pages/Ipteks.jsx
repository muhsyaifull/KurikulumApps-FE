import React, { useState, useEffect} from "react";
import { Table, message, Form, Button, Space } from "antd";
import FormInputIpteks from "../components/Elements/Input/FormInputIpteks";
import GeneralLayout from "../components/Layout";
import axiosInstance from "../api/axios";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Ipteks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/ipteks/all-by-prodi");
        setData(response.data.map((item) => ({ ...item, key: item._id })));
      } catch (error) {
        console.error("Error Fetching Data:", error);
        message.error("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menambahkan data
  const addRow = async (values) => {
    try {
      const response = await axiosInstance.post("/ipteks", values);
      const newData = response.data;
      setData((prevData) => [...prevData, { ...newData, key: newData._id }]);
      form.resetFields();
      message.success("Data berhasil ditambahkan!");
    } catch (error) {
      console.error("Add Row Error:", error);
      message.error("Gagal menambahkan data.");
    }
  };

  // Fungsi untuk menghapus data
  const deleteRow = async (id) => {
    try {
      await axiosInstance.delete(`/ipteks/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      message.success("Data berhasil dihapus!");
    } catch (error) {
      console.error("Delete Row Error:", error);
      message.error("Gagal menghapus data.");
    }
  };

  // Fungsi untuk menyimpan data yang diedit
  const saveRow = async (key) => {
    try {
      const editedData = await form.validateFields();

      const payload = {
        _id: key,
        ...editedData,
      };

      await axiosInstance.patch(`/ipteks`, payload);

      setData((prevData) =>
        prevData.map((item) =>
          item._id === key ? { ...item, ...editedData } : item
        )
      );

      message.success("Data berhasil diperbarui!");
      setEditingKey("");
      form.resetFields();
    } catch (error) {
      console.error("Save Row Error:", error);
      message.error("Gagal menyimpan perubahan.");
    }
  };

  const startEditing = (record) => {
    setEditingKey(record._id);
    form.setFieldsValue({
      ilmuPengetahuan: record.ilmuPengetahuan,
      teknologi: record.teknologi,
      seni: record.seni,
    });
  };

  const cancelEditing = () => {
    setEditingKey("");
    form.resetFields();
  };

  const columns = [
    {
      title: "Ilmu Pengetahuan",
      dataIndex: "ilmuPengetahuan",
      key: "ilmuPengetahuan",
      width: "30%",
      render: (text, record) =>
        editingKey === record._id ? (
          <Form.Item
            name="ilmuPengetahuan"
            rules={[{ required: true, message: "Mohon isi Ilmu Pengetahuan" }]}
            style={{ margin: 0 }}
          >
            <input
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </Form.Item>
        ) : (
          text || "-"
        ),
    },
    {
      title: "Teknologi",
      dataIndex: "teknologi",
      key: "teknologi",
      width: "30%",
      render: (text, record) =>
        editingKey === record._id ? (
          <Form.Item
            name="teknologi"
            rules={[{ required: true, message: "Mohon isi Teknologi" }]}
            style={{ margin: 0 }}
          >
            <input
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </Form.Item>
        ) : (
          text || "-"
        ),
    },
    {
      title: "Seni",
      dataIndex: "seni",
      key: "seni",
      width: "20%",
      render: (text, record) =>
        editingKey === record._id ? (
          <Form.Item
            name="seni"
            rules={[{ required: true, message: "Mohon isi Seni" }]}
            style={{ margin: 0 }}
          >
            <input
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </Form.Item>
        ) : (
          text || "-"
        ),
    },
    {
      title: "Aksi",
      key: "action",
      width: "20%",
      render: (text, record) => {
        const isEditing = editingKey === record._id;
        return (
          <Space>
            {isEditing ? (
              <>
                <Button
                  type="link"
                  onClick={() => saveRow(record._id)}
                  icon={<SaveOutlined />}
                  style={{ color: "green" }}
                >
                  Simpan
                </Button>
                <Button
                  type="link"
                  onClick={cancelEditing}
                  icon={<CloseOutlined />}
                  style={{ color: "orange" }}
                >
                  Batal
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  onClick={() => startEditing(record)}
                  icon={<EditOutlined />}
                  style={{ color: "blue" }}
                >
                  Edit
                </Button>
                <Button
                  type="link"
                  onClick={() => deleteRow(record._id)}
                  icon={<DeleteOutlined />}
                  style={{ color: "red" }}
                >
                  Hapus
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <GeneralLayout>
      <div style={{ padding: "20px" }}>
        {/* Form untuk menambah data */}
        <FormInputIpteks onSubmit={addRow} isEditing={editingKey !== ""} />

        {/* Tabel untuk menampilkan data */}
        <Form form={form} component={false}>
          <Table
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={data}
            rowKey="_id"
            loading={loading}
            scroll={{ x: 800 }} // Tambahkan scroll horizontal untuk responsif
          />
        </Form>
      </div>
    </GeneralLayout>
  );
};

export default Ipteks;
