import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

const Sidebar = ({ collapsed }) => {
  const items = [
    {
      key: 'tahap1',
      icon: <UserOutlined />,
      label: 'Tahap 1',
      children: [
        { key: 'sksu', label: 'SKSU', icon: <VideoCameraOutlined /> },
        { key: 'bench-kurikulum', label: 'Bench Kurikulum', icon: <UploadOutlined /> },
        { key: 'ipteks', label: 'Ipteks', icon: <UserOutlined /> },
        { key: 'kkni', label: 'KKNI', icon: <VideoCameraOutlined /> },
      ],
    },
    {
      key: 'tahap2',
      icon: <VideoCameraOutlined />,
      label: 'Tahap 2',
      children: [
        { key: 'tahap2-opt1', label: 'Option 1', icon: <UploadOutlined /> },
        { key: 'tahap2-opt2', label: 'Option 2', icon: <UserOutlined /> },
      ],
    },
    {
      key: 'tahap3',
      icon: <UploadOutlined />,
      label: 'Tahap 3',
      children: [
        { key: 'tahap3-opt1', label: 'Option 1', icon: <VideoCameraOutlined /> },
        { key: 'tahap3-opt2', label: 'Option 2', icon: <UserOutlined /> },
      ],
    },
  ];

  return (
    <>
      {/* Sidebar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: collapsed ? '16px 8px' : '16px',
          background: '#001529', 
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Logo"
          style={{
            borderRadius: '50%',
            marginRight: collapsed ? 0 : 8,
            transition: 'margin 0.2s',
          }}
        />
        {!collapsed && (
          <span
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Kurikulum
          </span>
        )}
      </div>

      {/* Sidebar Menu */}
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['sksu']}
        defaultOpenKeys={['tahap1']}
        items={items}
      />
    </>
  );
};

export default Sidebar;
