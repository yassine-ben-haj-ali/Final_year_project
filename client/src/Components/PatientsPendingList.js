import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PatientsPendingList = () => {
  const columns = [
    {
      title: "Firstname",
      dataIndex: "Firstname",
      sorter: (a, b) => a.Firstname.localeCompare(b.Firstname),
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <>
            <button
              className="btn btn-outline-success"
              style={{ marginRight: "10px" }}
              onClick={() => {
                approvePatient(record._id);
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                RejectPatient(record._id);
              }}
            >
              Reject
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                navigate(`/patients/${record._id}`);
              }}
            >
              view profile
            </button>
          </>
        </Space>
      ),
    },
  ];
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const approvePatient = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/profile/patient/approve/${id}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        PatientsList();
      }
    } catch (err) {
      console.log("waa");
    }
  };
  const RejectPatient = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/profile/patient/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        PatientsList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const PatientsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/profile/patient/filter/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data?.patients);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    PatientsList();
  }, []);

  return (
    <div>
      <Table
        dataSource={Data}
        columns={columns}
        scroll={{
          x: 200,
        }}
      />
    </div>
  );
};
export default PatientsPendingList;
