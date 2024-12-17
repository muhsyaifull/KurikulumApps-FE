import { useEffect, useState } from "react";
import GeneralLayout from "../components/Layout";
import { message } from "antd";
import axiosInstance from "../api/axios";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import GeneralModal from "../components/Elements/Modal/GeneralModal";

const KKNI = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// State untuk form tambah
	const [kode, setKode] = useState("");
	const [deskripsi, setDeskripsi] = useState("");

	const [editingRow, setEditingRow] = useState(null);
	const [editDeskripsi, setEditDeskripsi] = useState("");
	const [editKode, setEditKode] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get("/cpl-kkni/all-by-prodi");
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleSubmit = async () => {
		const newData = { kode, deskripsi };

		try {
			const response = await axiosInstance.post("/cpl-kkni", newData);
			setData((prevData) => [...prevData, response.data]);
			setKode("");
			setDeskripsi("");
			message.success("Data berhasil ditambahkan");
		} catch (error) {
			const errorMessage = error.response.data.message
				? error.response.data.message.join(", ")
				: error.response.data.error;
			message.error(`Terjadi Kesalahan: ${errorMessage}`);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await axiosInstance.delete(`/cpl-kkni/${id}`);
			setData((prevData) => prevData.filter((item) => item._id !== id));
			message.success("Data berhasil dihapus");
		} catch (error) {
			message.error("Terjadi kesalahan: " + error.message);
		}
	};

	const handleEdit = (row) => {
		setEditingRow(row._id);
		setEditDeskripsi(row.deskripsi);
		setEditKode(row.kode);
	};

	const handleSave = async (id) => {
		const updatedData = { deskripsi: editDeskripsi, kode: editKode };

		try {
			const response = await axiosInstance.patch(`/cpl-kkni/${id}`, {
				...updatedData,
			});
			setData((prevData) =>
				prevData.map((item) =>
					item._id === id ? { ...item, deskripsi: updatedData.deskripsi } : item
				)
			);
			setEditingRow(null);
			setEditDeskripsi("");
			message.success("Data berhasil diperbarui");
		} catch (error) {
			// console.error();

			message.error("Terjadi kesalahan: " + errorMessage);
		}
	};

	if (loading) {
		return <p>Loading..</p>;
	}

	return (
		<GeneralLayout>
			<h1>Tambah CPL</h1>
			<Box sx={{ marginBottom: 2 }}>
				<TextField
					label="Kode"
					variant="outlined"
					value={kode}
					onChange={(e) => setKode(e.target.value)}
					sx={{ marginRight: 2 }}
				/>
				<TextField
					label="Deskripsi"
					variant="outlined"
					value={deskripsi}
					onChange={(e) => setDeskripsi(e.target.value)}
					multiline
					sx={{ marginRight: 2, width: "50%" }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					disabled={!kode || !deskripsi}>
					Tambah CPL
				</Button>
			</Box>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: "20%" }} align="center">
								Kode
							</TableCell>
							<TableCell sx={{ width: "50%" }} align="center">
								Deskripsi
							</TableCell>
							<TableCell sx={{ width: "30%" }} align="center">
								Aksi
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row._id}>
								<TableCell sx={{ width: "20%" }} align="center">
									{row.kode}
								</TableCell>
								<TableCell sx={{ width: "50%" }} align="center">
									{editingRow === row._id ? (
										<TextField
											value={editDeskripsi}
											onChange={(e) => setEditDeskripsi(e.target.value)}
											variant="outlined"
											size="small"
											multiline
											fullWidth
										/>
									) : (
										row.deskripsi
									)}
								</TableCell>
								<TableCell sx={{ width: "30%" }} align="center">
									<Box sx={{ display: "flex", justifyContent: "center" }}>
										{editingRow === row._id ? (
											<Button
												variant="contained"
												color="primary"
												size="small"
												onClick={() => handleSave(row._id)}>
												Save
											</Button>
										) : (
											<Button
												variant="contained"
												color="success"
												size="small"
												onClick={() => handleEdit(row)}>
												Edit
											</Button>
										)}
										<GeneralModal
											title="Delete"
											handleSubmit={() => handleDelete(row._id)}>
											<p>Apakah anda yakin ingin menghapus data ini?</p>
										</GeneralModal>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</GeneralLayout>
	);
};

export default KKNI;
