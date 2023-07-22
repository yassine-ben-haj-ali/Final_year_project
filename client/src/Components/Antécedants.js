import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Antécedants = ({ id }) => {
    const [data,setData]=useState();
    const { token } = useSelector((state) => 
    state.auth
  );
  const columns = [
    {
      title: "maladie",
      dataIndex: "Disease",
    },
    {
      title: "Lien de parenté",
      dataIndex: "Relationship",
    },
    {
      title: "commentaire",
      dataIndex: "Notes",
    },
  ];

  useEffect(() => {
    const getAntecedents = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/antecedent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAntecedents();
  }, []);

  return (
    <div>
      <Table dataSource={data} columns={columns} scroll={{ x: 1300 }}/>
    </div>
  );
};

export default Antécedants;
