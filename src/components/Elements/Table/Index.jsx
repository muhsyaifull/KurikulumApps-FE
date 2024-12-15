import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "antd";
import FormInput from "../Input/FormInput";
import KompetensiField from "../Input/KompetensiField";
import ButtonActions from "../Button/ButtonAction";

const { Column } = Table;

const TableContent = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const API_URL = "https://api.example.com/tables"; // Ganti URL API sesuai kebutuhan

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addRow = async (values) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newRow = await response.json();
        setData([newRow, ...data]);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const deleteRow = async (key) => {
    try {
      const response = await fetch(`${API_URL}/${key}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(data.filter((item) => item.key !== key));
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const saveRow = async (key) => {
    form.validateFields().then(async (row) => {
      try {
        const response = await fetch(`${API_URL}/${key}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(row),
        });

        if (response.ok) {
          setData(data.map((item) => (item.key === key ? { ...item, ...row } : item)));
          setEditingKey("");
        }
      } catch (error) {
        console.error("Error updating row:", error);
      }
    });
  };

  const addKompetensi = (key) => {
    setData(
      data.map((item) =>
        item.key === key
          ? { ...item, kompetensiKerja: [...(item.kompetensiKerja || []), { id: Date.now(), value: "" }] }
          : item
      )
    );
  };

  return (
    <div>
      {/* Form Input */}
      <FormInput onSubmit={addRow} form={form} />

      {/* Tabel */}
      <Table dataSource={data} rowKey="key" pagination={false}>
        <Column title="Profil Lulusan" dataIndex="profilLulusan" />
        <Column title="Kualifikasi" dataIndex="kualifikasi" />
        <Column title="Kategori" dataIndex="kategori" />
        <Column
          title="Kompetensi Kerja"
          render={(text, record) => (
            <KompetensiField
              kompetensi={record.kompetensiKerja || []}
              onAdd={() => addKompetensi(record.key)}
              onRemove={() => console.log("Remove kompetensi")} // Tambahkan logika tambahan jika dibutuhkan
            />
          )}
        />
        <Column
          title="Aksi"
          render={(text, record) => (
            <ButtonActions
              isEditing={editingKey === record.key}
              onEdit={() => setEditingKey(record.key)}
              onSave={() => saveRow(record.key)}
              onCancel={() => setEditingKey("")}
              onDelete={() => deleteRow(record.key)}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default TableContent;
