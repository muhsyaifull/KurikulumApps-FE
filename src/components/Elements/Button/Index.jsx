import { Button as AntdButton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SearchButton = () => {
  const [position] = useState('end');

  return (
    <AntdButton type="primary" icon={<SearchOutlined />} iconPosition={position}>
    Search
  </AntdButton>
  );
};

export default SearchButton;
