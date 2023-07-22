import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Image, Space, Table, Tag, notification } from "antd";
import moment from "moment"
const ApprovedDoctors = () => {
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
      title: "Speciality",
      dataIndex: "Speciality",
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
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
                RejectDoctor(record._id);
              }}
            >
              Delete
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
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();
  const navigate = useNavigate();

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
        notification.success({message:"Doctor has been removed with success"})
        DoctorsList();
      }
    } catch (err) {
      console.log(err);
      notification.error({message:err.message})
    }
  };

  const DoctorsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/profile/doctor/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setData(response.data?.doctors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    DoctorsList();
  }, []);

  return (
    <div>
      <Table dataSource={Data} columns={columns} pagination={{ pageSize: 3 }}  scroll={{
          x: 1300,
        }}/>
    </div>
  );
};

export default ApprovedDoctors;
