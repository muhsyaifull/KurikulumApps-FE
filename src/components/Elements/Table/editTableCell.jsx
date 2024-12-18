import React from "react";
import { Input, Select } from "antd";

const EditableCell = ({
    editable,
    value,
    onChange,
    type = "input", // Default to 'input', can be 'select' for select boxes
    options = [], // Options for Select if type is 'select'
    ...restProps
}) => {
    const handleChange = (e) => {
        const newValue = type === "select" ? e : e.target.value;
        onChange(newValue);
    };

    return (
        <td {...restProps}>
            {editable ? (
                type === "select" ? (
                    <Select value={value} onChange={handleChange} style={{ width: "100%" }}>
                        {options.map((option) => (
                            <Select.Option key={option} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                ) : (
                    <Input value={value} onChange={handleChange} onBlur={() => onChange(value)} />
                )
            ) : (
                value
            )}
        </td>
    );
};

export default EditableCell;
