import React from "react";
import { Button, Dropdown, Card } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ collapsed, setCollapsed }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const userPanel = (
		<Card
			title="User Information"
			style={{
				width: 300,
			}}>
			<p>
				<strong>Name:</strong> John Doe
			</p>
			<p>
				<strong>Email:</strong> john.doe@example.com
			</p>
			<p>
				<strong>Role:</strong> Administrator
			</p>
			<Button
				type="primary"
				danger
				block
				onClick={() => {
					logout();
					navigate("/login");
				}}>
				Logout
			</Button>
		</Card>
	);

	return (
		<div
			style={{
				padding: "0 16px",
				background: "#fff",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
			}}>
			{/* Sidebar Toggle */}
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: "16px",
					width: 64,
					height: 64,
				}}
			/>

			{/* User Dropdown */}
			<Dropdown overlay={userPanel} placement="bottomRight" trigger={["click"]}>
				<Button
					type="text"
					icon={<UserOutlined />}
					style={{
						fontSize: "16px",
						height: 64,
					}}>
					John Doe
				</Button>
			</Dropdown>
		</div>
	);
};

export default Navbar;
