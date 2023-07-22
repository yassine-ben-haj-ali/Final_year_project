import React, { useEffect, useState } from "react";
import { Collapse, Button, notification, Table, Space } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
const { Panel } = Collapse;
const DiseasesList = ({ Diseases, getDiseases }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8800/api/disease/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getDiseases();
      notification.success({ message: "Disease supprimée avec succés" });
    } catch (err) {
      notification.error({ message: "probléme est intervenu" });
    }
  };
  const columns = [
    {
      title: "maladie",
      dataIndex: "Name",
    },
    {
      title: "spécialité médicale",
      dataIndex: "Speciality",
    },
    {
      title: "Détectée en",
      dataIndex: "DetectedIn",
      sorter: (a, b) =>
        new Date(a.DetectedIn).getTime() - new Date(b.DetectedIn).getTime(),
      render: (text) =>
        moment(new Date(text)).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Guérie en",
      dataIndex: "CuredIn",
      sorter: (a, b) =>
        new Date(a.YearOfDiscovery).getTime() -
        new Date(b.YearOfDiscovery).getTime(),
      render: (text) =>
        moment(new Date(text)).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Antécédent familial",
      dataIndex: "Genetic",
      render: (Genetic) => (Genetic ? "true" : "false"),
    },
    {
      title: "Longue durée",
      dataIndex: "ChronicDisease",
      render: (ChronicDisease) => (ChronicDisease ? "true" : "false"),
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
      <Table dataSource={Diseases} columns={columns} scroll={{ x: 1300 }} />
    </div>
  );
};

export default DiseasesList;
