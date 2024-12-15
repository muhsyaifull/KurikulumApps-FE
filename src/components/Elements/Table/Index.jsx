import React, { useState } from 'react';
import { Table, Form } from 'antd';
import FormInput from '../Input/FormInput';
import KompetensiField from '../Input/KomptensiField';
import ButtonActions from '../Button/ButtonAction';

const { Column } = Table;

const TableContent = () => {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const addRow = (values) => {
    const newRow = {
      key: Date.now(),
      ...values,
      kompetensiKerja: [],
    };
    setData([...data, newRow]);
    form.resetFields();
  };

  const deleteRow = (key) => setData(data.filter((item) => item.key !== key));

  const editRow = (key) => setEditingKey(key);
  const saveRow = (key) => {
    form.validateFields().then((row) => {
      setData(data.map((item) => (item.key === key ? { ...item, ...row } : item)));
      setEditingKey('');
    });
  };

  const addKompetensi = (key) => {
    setData(
      data.map((item) =>
        item.key === key
          ? { ...item, kompetensiKerja: [...item.kompetensiKerja, { id: Date.now(), value: '' }] }
          : item
      )
    );
  };

  return (
    <div>
      <FormInput onSubmit={addRow} form={form} />

      <Table dataSource={data} rowKey="key" pagination={false}>
        <Column
          title="Profil Lulusan"
          dataIndex="profilLulusan"
          render={(text, record) =>
            editingKey === record.key ? <Form.Item name="profilLulusan"><input defaultValue={text} /></Form.Item> : text
          }
        />
        <Column title="Kualifikasi" dataIndex="kualifikasi" />
        <Column title="Kategori" dataIndex="kategori" />
        <Column
          title="Kompetensi Kerja"
          render={(text, record) => (
            <KompetensiField
              kompetensi={record.kompetensiKerja}
              onChange={(id, value) =>
                setData(
                  data.map((item) =>
                    item.key === record.key
                      ? {
                          ...item,
                          kompetensiKerja: item.kompetensiKerja.map((k) =>
                            k.id === id ? { ...k, value } : k
                          ),
                        }
                      : item
                  )
                )
              }
              onRemove={(id) =>
                setData(
                  data.map((item) =>
                    item.key === record.key
                      ? { ...item, kompetensiKerja: item.kompetensiKerja.filter((k) => k.id !== id) }
                      : item
                  )
                )
              }
              onAdd={() => addKompetensi(record.key)}
            />
          )}
        />
        <Column
          title="Aksi"
          render={(text, record) => (
            <ButtonActions
              isEditing={editingKey === record.key}
              onEdit={() => editRow(record.key)}
              onSave={() => saveRow(record.key)}
              onCancel={() => setEditingKey('')}
              onDelete={() => deleteRow(record.key)}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default TableContent;
