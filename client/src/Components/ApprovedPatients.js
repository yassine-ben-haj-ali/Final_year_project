import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Image, Space, Table, notification } from "antd";
import  moment  from "moment";
const ApprovedPatients = () => {
  const columns = [
    {
      title: "Firstname",
      dataIndex: "Firstname",
      sorter: (a, b) => a.Firstname.localeCompare(b.Firstname),
    },
    {
      title: "Lastname",
      dataIndex: "Lastname",
      sorter: (a, b) => a.Lastname.localeCompare(b.Lastname),
    },
    {
      title: "Picture",
      dataIndex: "Picture",
      render: (image) => (
        <div>
          <Image src={`http://localhost:8800/Assets/${image}`} width={100} />
        </div>
      ),
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
              className="btn btn-outline-danger"
              onClick={() => {
                RejectPatient(record._id);
              }}
            >
              Delete
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
        notification.success({message:"patient has been removed with success"})
        PatientsList();

      }
    } catch (err) {
      notification.success({message:err.message})
    }
  };

  const PatientsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/profile/patient/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
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
      <Table dataSource={Data} columns={columns} pagination={{ pageSize: 3 }}   scroll={{
          x: 1300,
        }}/>
    </div>
  );
};

export default ApprovedPatients;
