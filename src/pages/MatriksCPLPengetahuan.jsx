import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	Paper,
	Button,
} from "@mui/material";

const RelationMatrix = () => {
	// Data CPL dan Pengetahuan
	const cplData = [
		{ id: "CPL001", deskripsi: "Deskripsi untuk CPL001" },
		{ id: "CPL002", deskripsi: "Deskripsi untuk CPL002" },
		{ id: "CPL003", deskripsi: "Deskripsi untuk CPL003" },
		{ id: "CPL004", deskripsi: "Deskripsi untuk CPL004" },
		{ id: "CPL005", deskripsi: "Deskripsi untuk CPL005" },
		{ id: "CPL006", deskripsi: "Deskripsi untuk CPL006" },
		{ id: "CPL007", deskripsi: "Deskripsi untuk CPL007" },
		{ id: "CPL008", deskripsi: "Deskripsi untuk CPL008" },
		{ id: "CPL009", deskripsi: "Deskripsi untuk CPL009" },
		{ id: "CPL010", deskripsi: "Deskripsi untuk CPL010" },
	];

	const pengetahuanData = [
		{ id: "PEN001", deskripsi: "Deskripsi untuk PEN001" },
		{ id: "PEN002", deskripsi: "Deskripsi untuk PEN002" },
		{ id: "PEN003", deskripsi: "Deskripsi untuk PEN003" },
		{ id: "PEN004", deskripsi: "Deskripsi untuk PEN004" },
		{ id: "PEN005", deskripsi: "Deskripsi untuk PEN005" },
		{ id: "PEN006", deskripsi: "Deskripsi untuk PEN006" },
		{ id: "PEN007", deskripsi: "Deskripsi untuk PEN007" },
		{ id: "PEN008", deskripsi: "Deskripsi untuk PEN008" },
		{ id: "PEN009", deskripsi: "Deskripsi untuk PEN009" },
		{ id: "PEN010", deskripsi: "Deskripsi untuk PEN010" },
	];

	// Data relasi yang sudah ada (misalnya diambil dari database atau data sebelumnya)
	const initialRelations = [
		{ cplId: "CPL001", pengetahuanId: "PEN001" },
		{ cplId: "CPL002", pengetahuanId: "PEN003" },
		{ cplId: "CPL005", pengetahuanId: "PEN005" },
		{ cplId: "CPL007", pengetahuanId: "PEN009" },
	];

	// State untuk menyimpan status checkbox dan array of object yang dipilih
	const [selected, setSelected] = useState([]);

	// Fungsi untuk menangani perubahan status checkbox
	const handleCheckboxChange = (cplId, pengetahuanId) => {
		setSelected((prevSelected) => {
			const key = `${cplId}-${pengetahuanId}`;
			if (
				prevSelected.some(
					(item) => item.cplId === cplId && item.pengetahuanId === pengetahuanId
				)
			) {
				// Jika pasangan sudah ada, hapus dari array
				return prevSelected.filter(
					(item) => item.cplId !== cplId || item.pengetahuanId !== pengetahuanId
				);
			} else {
				// Jika pasangan belum ada, tambahkan ke array
				return [...prevSelected, { cplId, pengetahuanId }];
			}
		});
	};

	// Memuat data relasi yang sudah ada saat komponen pertama kali dimuat
	useEffect(() => {
		setSelected(initialRelations); // Set initial relations (misalnya dari API atau state global)
	}, []);

	// Render tabel matriks relasi
	const renderMatrix = () => (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{pengetahuanData.map((pen, idx) => (
							<TableCell key={idx}>{pen.deskripsi}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{cplData.map((cpl, cplIndex) => (
						<TableRow key={cpl.id}>
							<TableCell>{cpl.deskripsi}</TableCell>
							{pengetahuanData.map((pen) => {
								const isChecked = selected.some(
									(item) =>
										item.cplId === cpl.id && item.pengetahuanId === pen.id
								);
								return (
									<TableCell key={`${cpl.id}-${pen.id}`}>
										<Checkbox
											checked={isChecked}
											onChange={() => handleCheckboxChange(cpl.id, pen.id)}
										/>
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);

	// Fungsi untuk menyimpan data yang dipilih (untuk kebutuhan selanjutnya)
	const handleSave = () => {
		console.log("Data yang dipilih:", selected);
		alert("Data yang dipilih telah disimpan! Lihat console untuk detailnya.");
	};

	return (
		<Container>
			<Typography
				variant="h4"
				gutterBottom
				style={{ textAlign: "center", marginTop: "20px" }}>
				Matriks Relasi CPL dan Pengetahuan
			</Typography>
			{renderMatrix()}
			<Button
				variant="contained"
				color="primary"
				onClick={handleSave}
				style={{
					marginTop: "20px",
					display: "block",
					marginLeft: "auto",
					marginRight: "auto",
				}}>
				Simpan Data
			</Button>
		</Container>
	);
};

export default RelationMatrix;
