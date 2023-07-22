import { Image, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Analysis = ({ id }) => {
  const [data, setData] = useState();
  const { token } = useSelector((state) => state.auth);
  const columns = [
    {
      title: "Nom d'analyse",
      dataIndex: "Name",
      width: 200,
    },
    {
      title: "Date d'analyse",
      dataIndex: "Date",
      sorter: (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),

      width: 200,
    },
    {
      title: "Resultat",
      dataIndex: "Result",
      render: (images) => <Image src={`http://localhost:8800/Assets/${images}`} width={100} />,
    },
    {
      title: "commentaire",
      dataIndex: "Notes",
    },
  ];

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/analysis/${id}`,
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
    getAnalysis();
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

export default Analysis;
