import { Modal, Button } from "antd";
import { useState } from "react";

const GeneralModal = ({ children, handleSubmit, title = "Delete" }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		handleSubmit();
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button variant="solid" color="danger" onClick={showModal}>
				{title}
			</Button>
			<Modal
				title={title}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				{children}
			</Modal>
		</>
	);
};

export default GeneralModal;
