import React, { useEffect, useState } from "react";
import { Collapse, Button, notification, Image, Table, Space } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
const { Panel } = Collapse;
const RadiographyList = ({ Radiographys, getRadiography }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8800/api/radiography/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getRadiography();
      notification.success({
        message: "examen radiography supprimée avec succés",
      });
    } catch (err) {
      notification.error({ message: "probléme est intervenu" });
    }
  };
  const columns = [
    {
      title: "Type d'examen",
      dataIndex: "Type",
    },
    {
      title: "Date d'examen",
      dataIndex: "Date",
      sorter: (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },

    {
      title: "Motif de l'examen",
      dataIndex: "Reason",
    },
    {
      title: "Result",
      dataIndex: "Result",
      render: (images) => <Image src={`http://localhost:8800/Assets/${images}`} width={100} />,
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
      <Table dataSource={Radiographys} columns={columns} scroll={{ x: 1300 }} />
    </div>
  );
};

export default RadiographyList;
