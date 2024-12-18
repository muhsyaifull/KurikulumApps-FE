import React, { useEffect, useState } from "react";
import ViewTable from "../../components/Elements/Table/viewTable";
import { Table, Form, Input, Button, message, Select, Popconfirm } from "antd";
import axiosInstance from "../../api/axios";
import GeneralLayout from "../../components/Layout";
import "../../../public/css/style.css"
import { useNavigate } from "react-router-dom";


const ViewBenchCurriculum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/bc/all-by-prodi");
        setData(response.data);
      } catch (error) {
        message.error("Gagal memuat data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/bc/delete/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      message.success("Data berhasil dihapus");
    } catch (error) {
      message.error("Gagal menghapus data: " + error.message);
    }
  };

  // Hapus banyak item
  const handleBatchDelete = async () => {
    try {
      const ids = selectedRowKeys.map(id => ({_id: id}));
      await axiosInstance.delete("/bc/delete-many", { data: ids });
      setData((prevData) =>
        prevData.filter((item) => !selectedRowKeys.includes(item._id))
      );
      setSelectedRowKeys([]); // Reset pilihan
      message.success("Data terpilih berhasil dihapus");
    } catch (error) {
      message.error("Gagal menghapus data terpilih: " + error.message);
    }
  };

  const columns = [
    { title: "Prodi", dataIndex: "prodi", key: "prodi" },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "CPL",
      dataIndex: "CPL",
      key: "CPL",
      render: (CPL) => (
        <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {CPL.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ),
      width: 600,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <>
          {/* Tombol Hapus */}
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus data ini?"
            onConfirm={() => handleDelete(record._id)}
            okText="Ya"
            cancelText="Batal">
            <Button type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleEdit = () => {
    navigate("/edit-bench-curriculum"); 
  };

  return (
    <GeneralLayout>
      <div className="container">
        <div className="header">
          <h1>Daftar Benchmark Curriculum</h1>
          <div className="button-container">
            {selectedRowKeys.length > 0 && (
              <Button
              type="primary"
                danger
                onClick={handleBatchDelete}
                style={{ margin: "10px 0" }}
              >
                Hapus Semua
              </Button>
            )}
            <Button className="button-edit-bc" type="primary" onClick={handleEdit}>
              Edit BC
            </Button>
          </div>
        </div>
        <ViewTable
          columns={columns}
          dataSource={data}
          loading={loading}
          className="custom-table"
          rowSelection={rowSelection}
        />
      </div>
    </GeneralLayout>
  );
  
};

export default ViewBenchCurriculum;
