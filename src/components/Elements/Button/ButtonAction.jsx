import React from 'react';
import { Button, Space } from 'antd';

const ButtonActions = ({ isEditing, onEdit, onSave, onCancel, onDelete }) => (
  <Space>
    {isEditing ? (
      <>
        <Button type="primary" onClick={onSave}>
          Simpan
        </Button>
        <Button onClick={onCancel}>Batal</Button>
      </>
    ) : (
      <>
        <Button onClick={onEdit}>Edit</Button>
        <Button danger onClick={onDelete}>
          Hapus
        </Button>
      </>
    )}
  </Space>
);

export default ButtonActions;
