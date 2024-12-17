import React, { useEffect, useState } from "react";
import {
	Table,
	Layout,
	theme,
	Form,
	Input,
	Button,
	message,
	Select,
	Space,
} from "antd";
import Sidebar from "../components/Elements/Sidebar/Index";
import Navbar from "../components/Elements/Navbar/Index";
import GeneralLayout from "../components/Layout";
import KompetensiField from "../components/Elements/Input/KompetensiField";
import GeneralModal from "../components/Elements/Modal/GeneralModal";
import axiosInstance from "../api/axios";

const SKSU = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [form] = Form.useForm();

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get("/sksu/all-by-prodi");
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const saveChanges = async () => {
		try {
			const updates = data.map((item) => ({
				_id: item._id,
				profilLulusan: item.profilLulusan,
				kualifikasi: item.kualifikasi,
				kategori: item.kategori,
				kompetensiKerja: item.kompetensiKerja,
			}));

			await axiosInstance.patch("/sksu", { updates });
			message.success("Perubahan berhasil disimpan!");
		} catch (error) {
			message.error(
				"Terjadi kesalahan saat menyimpan perubahan: " + error.message
			);
		}
	};

	const onFinish = async (values) => {
		const { profilLulusan, kualifikasi, kategori } = values;

		const postData = {
			profilLulusan,
			kualifikasi,
			kategori,
			kompetensiKerja: [],
		};

		try {
			const response = await axiosInstance.post("/sksu", postData);
			setData((prevData) => [...prevData, response.data]);
			form.resetFields();
		} catch (error) {
			message.error("Terjadi kesalahan: " + error.message);
		}
	};

	const handleKompetensiChange = (recordId, kompetensiIndex, newValue) => {
		const updatedData = [...data];
		const record = updatedData.find((record) => record._id === recordId);

		if (record) {
			if (
				record.kompetensiKerja &&
				record.kompetensiKerja[kompetensiIndex] !== undefined
			) {
				record.kompetensiKerja[kompetensiIndex] = newValue;
			}
		}

		setData(updatedData);
	};

	const addKompetensi = (id, newKompetensi) => {
		if (!newKompetensi) {
			message.error("Mohon masukkan kompetensi");
			return;
		}

		const updatedData = data.map((item) => {
			if (item._id === id) {
				return {
					...item,
					kompetensiKerja: [...item.kompetensiKerja, newKompetensi],
				};
			}
			return item;
		});

		setData(updatedData);
	};

	const handleDeleteSksu = async (id) => {
		try {
			await axiosInstance.delete(`/sksu/${id}`);
			setData((prevData) => prevData.filter((item) => item._id !== id));
			message.success("Data berhasil dihapus");
		} catch (error) {
			message.error("Terjadi kesalahan: " + error.message);
		}
	};

	const columns = [
		{
			title: "Profil Lulusan",
			dataIndex: "profilLulusan",
			key: "profilLulusan",
		},
		{
			title: "Kualifikasi",
			dataIndex: "kualifikasi",
			key: "kualifikasi",
		},
		{
			title: "Kategori",
			dataIndex: "kategori",
			key: "kategori",
		},
		{
			title: "Kompetensi Kerja",
			dataIndex: "kompetensiKerja",
			key: "kompetensiKerja",
			render: (kompetensiKerja, record) => (
				<KompetensiField
					kompetensi={kompetensiKerja}
					onChange={(kompetensiChange, index) =>
						handleKompetensiChange(record._id, index, kompetensiChange)
					}
					onAdd={(newKompetensi) => addKompetensi(record._id, newKompetensi)}
				/>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space>
					<GeneralModal
						title="Delete"
						handleSubmit={() => handleDeleteSksu(record._id)}>
						<h2>Apakah anda yakin untuk menghapus?</h2>
					</GeneralModal>
				</Space>
			),
		},
	];

	return (
		<GeneralLayout>
			<Form layout="inline" onFinish={onFinish} form={form}>
				<Form.Item
					name="profilLulusan"
					rules={[{ required: true, message: "Mohon isikan profil lulusan" }]}>
					<Input placeholder="Profil Lulusan" />
				</Form.Item>
				<Form.Item
					name="kualifikasi"
					rules={[{ required: true, message: "Mohon isikan kualifikasi" }]}>
					<Input placeholder="Kualifikasi" />
				</Form.Item>
				<Form.Item
					name="kategori"
					rules={[{ required: true, message: "Mohon isikan kategori" }]}>
					<Select placeholder="Pilih Kategori">
						<Select.Option value="Siap Kerja">Siap Kerja</Select.Option>
						<Select.Option value="Siap Usaha">Siap Usaha</Select.Option>
					</Select>
				</Form.Item>
				<Button type="primary" htmlType="submit">
					Tambah SKSU
				</Button>
			</Form>

			<Table
				pagination={false}
				columns={columns}
				dataSource={data}
				rowKey="_id"
				loading={loading}
			/>

			<Button onClick={saveChanges}>Save Perubahan</Button>
		</GeneralLayout>
	);
};

export default SKSU;
