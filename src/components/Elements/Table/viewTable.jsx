import React from "react";
import { Table, Tag } from "antd";

const ViewTable = ({ columns, dataSource, loading, className, rowSelection  }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={(record) => record._id || record.key} // Pastikan rowKey unik
      pagination={{ pageSize: 10 }} // Opsional: Batasi data per halaman
      className={className}
      rowSelection={rowSelection}
    />
  );
};

export default ViewTable;
