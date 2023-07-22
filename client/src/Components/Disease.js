import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Disease = ({ id }) => {
  const [data, setData] = useState();
  const { token } = useSelector((state) => state.auth);

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
  ];
  useEffect(() => {
    const getDiseases = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/disease/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDiseases();
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

export default Disease;
