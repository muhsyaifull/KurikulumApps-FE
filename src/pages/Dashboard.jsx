import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "../components/Elements/Sidebar/Index";
import Navbar from "../components/Elements/Navbar/Index";
import Breadcrumbs from "../components/Elements/Breadcrumps";
import TableContent from "../components/Elements/Table/Index";

const { Content, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sidebar collapsed={collapsed} />
      </Sider>

      <Layout>
        {/* Navbar */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout style={{ padding: "0 24px 24px" }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { title: "Home" },
              { title: "Dashboard" },
              { title: "Table" },
            ]}
          />

          {/* Main Content */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Table */}
            <TableContent />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
