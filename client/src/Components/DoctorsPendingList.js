import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const DoctorsPendingList = () => {
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const approveDoctor = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/profile/doctor/approve/${id}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        DoctorsList();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const RejectDoctor = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/profile/doctor/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        DoctorsList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DoctorsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/profile/doctor/filter/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data?.doctors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    DoctorsList();
  }, []);

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
      title: "Speciality",
      dataIndex: "Speciality",
      render: (text) => <Tag color="blue">{text}</Tag>,
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
                approveDoctor(record._id);
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                RejectDoctor(record._id);
              }}
            >
              Reject
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                navigate(`/doctors/${record._id}`);
              }}
            >
              view profile
            </button>
          </>
        </Space>
      ),
    },
  ];

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

export default DoctorsPendingList;
