import { ExpandMore } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	TextField,
	ButtonBase,
	Box,
	TextareaAutosize,
	List,
	ListItem,
} from "@mui/material";
import { useState } from "react";

const MyAccordion = ({ title, data, onSave }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editedData, setEditedData] = useState(data);
	const isArray = Array.isArray(data);

	const handleChange = (e, index) => {
		if (isArray) {
			const updatedData = [...editedData];
			updatedData[index] = e.target.value;
			setEditedData(updatedData);
		} else {
			setEditedData(e.target.value);
		}
	};

	const handleAdd = () => {
		const updatedData = [...editedData];
		if (isArray) {
			updatedData.push("");
		} else {
			updatedData.push("");
		}
		setEditedData(updatedData);
	};

	const handleEdit = () => {
		setIsEdit(!isEdit);
	};

	const handleDelete = (index) => {
		console.log("Menghapus indeks:", index); // Debug
		const updatedData = editedData.filter((_, i) => i !== index);
		console.log("Data setelah dihapus:", updatedData); // Debug
		setEditedData(updatedData);
	};

	const handleCancel = () => {
		setEditedData(data);
		setIsEdit(!isEdit);
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEdit(false);
	};
	return (
		<Accordion defaultExpanded>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<h2 style={{ textAlign: "center" }}>{title}</h2>
			</AccordionSummary>
			<AccordionDetails>
				{isEdit ? (
					<>
						{isArray ? (
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								{editedData.map((item, index) => (
									<Box
										key={index}
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 1,
										}}>
										<TextField
											multiline
											fullWidth
											value={item}
											onChange={(e) => handleChange(e, index)}
										/>
										<Button
											variant="contained"
											color="error"
											onClick={() => handleDelete(index)}
											sx={{ minWidth: "40px" }}>
											-
										</Button>
									</Box>
								))}
								<Button fullWidth onClick={handleAdd}>
									Tambah Point
								</Button>
							</Box>
						) : (
							<TextField
								defaultValue={editedData}
								multiline
								fullWidth
								onChange={(e) => handleChange(e, 0)}></TextField>
						)}
						<Button onClick={handleSave}>Save</Button>
						<Button onClick={handleCancel}>Cancel</Button>
					</>
				) : (
					<>
						{isArray ? (
							<List>
								{editedData.map((item, index) => (
									<ListItem key={index}>
										{index + 1}. {item}
									</ListItem>
								))}
							</List>
						) : (
							<p>{editedData}</p>
						)}
						<Button onClick={handleEdit}>Edit</Button>
					</>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default MyAccordion;
