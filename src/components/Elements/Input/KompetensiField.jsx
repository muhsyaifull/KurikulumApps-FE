import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";

const KompetensiField = ({ kompetensi, onChange, onRemove, onAdd }) => {
	const [newKompetensi, setNewKompetensi] = useState("");

	const handleAdd = () => {
		onAdd(newKompetensi);
		setNewKompetensi("");
	};

	return (
		<div>
			{kompetensi.map((item, index) => (
				<div key={index} style={{ display: "flex", marginBottom: 8 }}>
					<Tooltip title={item}>
						<Input.TextArea
							value={item}
							onChange={(e) => onChange(e.target.value, index)}
							style={{ marginRight: 8, resize: "none" }}
							autoSize={{ minRows: 1, maxRows: 6 }}
						/>
					</Tooltip>
					<Button danger onClick={() => onRemove(index)}>
						{" "}
						{/* Hapus berdasarkan index */}-
					</Button>
				</div>
			))}
			<div style={{ display: "flex", marginBottom: 8 }}>
				<Tooltip title={newKompetensi}>
					<Input
						value={newKompetensi}
						onChange={(e) => setNewKompetensi(e.target.value)}
						style={{ marginRight: 8 }}
						placeholder="Tambah kompetensi"
					/>
				</Tooltip>

				<Button onClick={handleAdd}>+ Tambah</Button>
			</div>
		</div>
	);
};

export default KompetensiField;
