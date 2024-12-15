import React from 'react';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ items }) => (
  <Breadcrumb
    items={items}
    style={{
      margin: '16px 0',
    }}
  />
);

export default Breadcrumbs;
