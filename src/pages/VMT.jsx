import { Box } from "@mui/material";
import MyAccordion from "../components/Elements/Accordion/MyAccordion";
import GeneralLayout from "../components/Layout";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { message } from "antd";
import ApiUrls from "../utils/constant/apiUrlsConstant";

const VMT = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get("/vmt");
				setData(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				message.error("Gagal mengunggah data");
			}
		};
		fetchData();
	}, []);

	const handleUpdate = async (url, value) => {
		try {
			const response = await axiosInstance.patch(`${url}`, {
				value: value,
			});
			setData(response.data);
			message.success("Data berhasil  diupdate");
		} catch (error) {
			console.error("Error updating VMT data:", error);
		}
	};

	if (loading) return <p>Loading...</p>;
	return (
		<GeneralLayout>
			<h1 style={{}}>Visi Misi dan Tujuan</h1>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<MyAccordion
					title="Visi Polban"
					data={data.visiPolban}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_VISIPOLBAN, value);
					}}></MyAccordion>
				<MyAccordion
					title="Misi Polban"
					data={data.misiPolban}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_MISIPOLBAN, value);
					}}></MyAccordion>
				<MyAccordion
					title="Tujuan Polban"
					data={data.tujuanPolban}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_TUJUANPOLBAN, value);
					}}></MyAccordion>
				<MyAccordion
					title="Visi Jurusan"
					data={data.visiJurusan}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_VISIJURUSAN, value);
					}}></MyAccordion>
				<MyAccordion
					title="Misi Jurusan"
					data={data.misiJurusan}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_MISIJURUSAN, value);
					}}></MyAccordion>
				<MyAccordion
					title="Visi Keilmuan Program studi"
					data={data.visiKeilmuanProgramStudi}
					onSave={(value) => {
						handleUpdate(ApiUrls.VMT_VISIKEILMUANPROGSTUDI, value);
					}}></MyAccordion>
			</Box>
		</GeneralLayout>
	);
};

export default VMT;
