import { Layout } from "antd";
import Navbar from "./Elements/Navbar/Index";
import Sidebar from "./Elements/Sidebar/Index";
import { useState } from "react";
const { Content, Sider } = Layout;
const GeneralLayout = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* Sidebar */}
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Sidebar collapsed={collapsed} />
			</Sider>

			<Layout>
				{/* Navbar */}
				<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
				{/* Main Content */}
				{children}
			</Layout>
		</Layout>
	);
};

export default GeneralLayout;
