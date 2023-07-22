import React, { useEffect, useState } from "react";
import { Collapse, Button, notification, Space, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { Panel } = Collapse;

const AntecedentsList = ({ Antecedents, getAntecedents }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8800/api/antecedent/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAntecedents();
      notification.success({ message: "antecedent supprimée avec succés" });
    } catch (err) {
      notification.error({ message: "probléme est intervenu" });
    }
  };
  const columns = [
    {
      title: "maladie",
      dataIndex: "Disease",
    },
    {
      title: "Lien de parenté",
      dataIndex: "Relationship",
    },
    {
      title: "commentaire",
      dataIndex: "Notes",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                handleDelete(record._id);
              }}
            >
              Delete
            </button>
          </>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={Antecedents} columns={columns} scroll={{ x: 1300 }} />
    </div>
  );
};

export default AntecedentsList;
