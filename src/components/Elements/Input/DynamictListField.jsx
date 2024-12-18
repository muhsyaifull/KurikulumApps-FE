import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";

const DynamicListField = ({
	items = [],
	onChange,
	onAdd,
	onRemove,
	placeholder = "Tambah item",
	buttonText = "+ Tambah",
	inputType = "text",
}) => {
	const [newItem, setNewItem] = useState("");

	const handleAdd = () => {
		if (newItem.trim()) {
			onAdd(newItem);
			setNewItem("");
		}
	};

	return (
		<div>
			{items.map((item, index) => (
				<div key={index} style={{ display: "flex", marginBottom: 8 }}>
					<Tooltip title={item}>
						{inputType === "textarea" ? (
							<Input.TextArea
								value={item}
								onChange={(e) => onChange(e.target.value, index)}
								style={{ marginRight: 8, resize: "none" }}
								autoSize={{ minRows: 1, maxRows: 6 }}
							/>
						) : (
							<Input
								value={item}
								onChange={(e) => onChange(e.target.value, index)}
								style={{ marginRight: 8 }}
							/>
						)}
					</Tooltip>
					<Button danger onClick={() => onRemove(index)}>
						-
					</Button>
				</div>
			))}

			<div style={{ display: "flex", marginBottom: 8 }}>
				<Tooltip title={newItem}>
					<Input
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						style={{ marginRight: 8 }}
						placeholder={placeholder}
					/>
				</Tooltip>
				<Button onClick={handleAdd}>{buttonText}</Button>
			</div>
		</div>
	);
};

export default DynamicListField;
