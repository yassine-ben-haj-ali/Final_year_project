import React from "react";
import { Collapse, Button, notification, Image, Table, Space } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
const AnalysisList = ({ Analysis, getAnalysis }) => {
  const { token } = useSelector((state) => state.auth);
  console.log(Analysis);
  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8800/api/analysis/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAnalysis();
      notification.success({
        message: "analyse biologique supprimée avec succés",
      });
    } catch (err) {
      notification.error({ message: "probléme est intervenu" });
    }
  };
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
      title: "Result",
      dataIndex: "Result",
      render: (images) => <Image src={`http://localhost:8800/Assets/${images}`} width={100} />,
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
      <Table dataSource={Analysis} columns={columns} scroll={{ x: 1300 }} />
    </div>
  );
};

export default AnalysisList;
