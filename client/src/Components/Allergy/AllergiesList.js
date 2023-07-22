import React, { useEffect, useState } from "react";
import { Button, Space, Table, notification } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
const AllergiesList = ({ Allergies, getAllergies }) => {
  const { token } = useSelector((state) => state.auth);
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8800/api/allergy/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllergies();
      notification.success({ message: "Allergie supprimée avec succés" });
    } catch (err) {
      notification.error({ message: "probléme est intervenu" });
    }
  };
  const columns = [
    {
      title: "nom d'allergie",
      dataIndex: "Name",
    },
    {
      title: "type d'allergie",
      dataIndex: "Type",
    },
    {
      title: "L'année de découverte",
      dataIndex: "YearOfDiscovery",
      sorter: (a, b) =>
        new Date(a.YearOfDiscovery).getTime() -
        new Date(b.YearOfDiscovery).getTime(),
        render: (text) => moment(new Date(text)).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Etat de suivi de l'allergie",
      dataIndex: "FollowupStatus",
    },
    {
      title: "allergie familiale",
      dataIndex: "FamilyHistory",
      width: 100,
      render: (familyHistory) => (familyHistory ? "true" : "false"),
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
      <Table
        columns={columns}
        dataSource={Allergies}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default AllergiesList;
