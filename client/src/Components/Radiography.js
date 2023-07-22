import { Image, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Radiography = ({ id }) => {
  const [data, setData] = useState();
  const { token } = useSelector((state) => 
    state.auth
  );
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
  ];
  useEffect(() => {
    const getRadiography = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/radiography/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRadiography();
  }, []);
  return (
    <div>
      <Table dataSource={data} columns={columns} scroll={{ x: 1300 }}/>
    </div>
  );
};

export default Radiography;
