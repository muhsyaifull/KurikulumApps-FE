import React from 'react';
import { Input, Button } from 'antd';

const KompetensiField = ({ kompetensi, onChange, onRemove, onAdd }) => (
  <div>
    {kompetensi.map((item) => (
      <div key={item.id} style={{ display: 'flex', marginBottom: 8 }}>
        <Input
          value={item.value}
          onChange={(e) => onChange(item.id, e.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button danger onClick={() => onRemove(item.id)}>
          -
        </Button>
      </div>
    ))}
    <Button onClick={onAdd}>+ Tambah</Button>
  </div>
);

export default KompetensiField;
