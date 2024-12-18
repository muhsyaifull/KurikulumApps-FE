import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, message, Select } from "antd";
import GeneralLayout from "../../components/Layout";
import axiosInstance from "../../api/axios";
import DynamicListField from "../../components/Elements/Input/DynamictListField";
import EditableCell from "../../components/Elements/Table/editTableCell";
import "../../../public/css/style.css"
import { useNavigate } from "react-router-dom";

// ENUM untuk kategori
const KATEGORI_BC_ENUM = {
    luar_negeri:"Luar Negeri",
    dalam_negeri:"Dalam Negeri",
}

const BenchCurriculum = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
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

    const onFinish = async (values) => {
        const {prodi, region, city, category } = values;

        const postData = {
        prodi,
        region,
        city,
        category,
        CPL: [],
        };

        try {
        const response = await axiosInstance.post("/bc/create-bench-curriculum", postData);
        setData((prevData) => [...prevData, response.data]);
        message.success("Data berhasil ditambahkan!");
        form.resetFields();
        } catch (error) {
        message.error("Gagal menambahkan data: " + error.message);
        }
    };

    const columns = [
        { title: "Prodi", dataIndex: "prodi", key: "prodi",
          render: (text, record) => (
            <EditableCell
                editable
                value={text}
                onChange={(value) => handleFieldChange(record._id, "prodi", value)}
            />
          ),
        },
        { title: "Region", dataIndex: "region", key: "region",
          render: (text, record) => (
            <EditableCell
                editable
                value={text}
                onChange={(value) => handleFieldChange(record._id, "region", value)}
            />
          ),
         },
        { title: "City", dataIndex: "city", key: "city",
          render: (text, record) => (
            <EditableCell
                editable
                value={text}
                onChange={(value) => handleFieldChange(record._id, "city", value)}
            />
          ),
         },
        {
        title: "Kategori",
        dataIndex: "category",
        key: "category",
        render: (text, record) => (
          <EditableCell
              editable
              value={text}
              onChange={(value) => handleFieldChange(record._id, "category", value)}
              type="select"
              options={Object.values(KATEGORI_BC_ENUM)} // Example of passing options to Select
          />
      ),
        },
        {
        title: "CPL",
        dataIndex: "CPL",
        key: "CPL",
        render: (CPL, record) => (
            <DynamicListField
                items={CPL}
                onAdd={(newCPL) => addCPL(record._id, newCPL)}
                onRemove={(index) => handleRemove(record._id, index)} 
                onChange={(value, index) => handleCPLChange(record._id, index, value)}
                placeholder="Tambah CPL"
                buttonText="+ Tambah CPL"
                inputType="textarea"
                />
        ),
        },
    ];

    const handleCPLChange = (id, index, newValue) => {
        const updatedData = data.map((item) => {
        if (item._id === id) {
            const updatedCPL = [...item.CPL];
            updatedCPL[index] = newValue;
            return { ...item, CPL: updatedCPL };
        }
        return item;
        });
        setData(updatedData);
    };

    const addCPL = (id, newCPL) => {
        if (!newCPL) {
        message.error("CPL tidak boleh kosong");
        return;
        }
        const updatedData = data.map((item) => {
        if (item._id === id) {
            return { ...item, CPL: [...item.CPL, newCPL] };
        }
        return item;
        });
        setData(updatedData);
    };

    const handleRemove = (id, index) => {
        const updatedData = data.map((item) => {
        if (item._id === id) {
            const updatedCPL = [...item.CPL];
            updatedCPL.splice(index, 1); // Hapus item CPL berdasarkan index
            return { ...item, CPL: updatedCPL };
        }
        return item;
        });
        setData(updatedData);
    };  

    const saveChanges = async () => {
        try {
            const updates = data.map((item) => ({
                _id: item._id, 
                prodi: item.prodi,
                region: item.region,
                city: item.city,
                category: item.category,
                CPL: item.CPL
            }));
            const response = await axiosInstance.patch("/bc/update-BC", { updates });
            message.success("Perubahan berhasil disimpan!");
        } catch (error) {
            message.error(
                "Terjadi kesalahan saat menyimpan perubahan: " + error.message
            );
        }
    };

    const handleFieldChange = (id, field, value) => {
      const updatedData = data.map((item) => {
          if (item._id === id) {
              return { ...item, [field]: value };
          }
          return item;
      });
      setData(updatedData);
  };

  return (
    <GeneralLayout>
      <div className="container">
        <Form layout="inline" form={form} onFinish={onFinish} style={{ margin: "20px", marginTop: "5px"}}>
          <Form.Item
            name="prodi"
            rules={[{ required: true, message: "Mohon isikan Prodi" }]}>
            <Input placeholder="Prodi" />
          </Form.Item>
          <Form.Item
            name="region"
            rules={[{ required: true, message: "Mohon isikan Region" }]}>
            <Input placeholder="Region" />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[{ required: true, message: "Mohon isikan City" }]}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Pilih kategori" }]}>
            <Select placeholder="Pilih Kategori">
              {Object.values(KATEGORI_BC_ENUM).map((kategori) => (
                <Select.Option key={kategori} value={kategori}>
                  {kategori}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Tambah Data
          </Button>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={loading}
        />
        <Button type="primary" onClick={saveChanges} success>Save Perubahan</Button>
        <Button
          type="primary"
          onClick={() => navigate(-1)} // Navigate to previous page
          style={{ marginLeft: "10px" }}
          danger
        >
          Cancel
        </Button>
      </div>
      
    </GeneralLayout>
  );
};

export default BenchCurriculum;
