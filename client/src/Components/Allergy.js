import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Allergy = ({ id }) => {
  const [data, setData] = useState();
  const { token } = useSelector((state) => state.auth);

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
      render: (familyHistory) => familyHistory ? "true" : "false"

    },
    {
      title: "commentaire",
      dataIndex: "Notes",
    },
  ];

  useEffect(() => {
    const getAllergies = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/allergy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllergies();
  }, []);

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
};

export default Allergy;
