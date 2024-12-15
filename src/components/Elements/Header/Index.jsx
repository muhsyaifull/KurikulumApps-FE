import React from 'react';
import { Menu } from 'antd';

const HeaderComponent = ({ items }) => (
  <header
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div className="demo-logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items}
      style={{
        flex: 1,
        minWidth: 0,
      }}
    />
  </header>
);

export default HeaderComponent;
