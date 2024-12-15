import { Button as AntdButton } from 'antd';
import { useState } from 'react';

const ButtonAdd = () => {
  const [position] = useState('end');

  return (
    <AntdButton
      style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
      }}
    >
      Add
    </AntdButton>
  );
};

export default ButtonAdd;
