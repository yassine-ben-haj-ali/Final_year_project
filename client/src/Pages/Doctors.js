import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorSearchCard from "../Components/DoctorSearchCard";
import { Input, Pagination, Space } from "antd";
const { Search } = Input;

const Doctors = () => {
  const [Doctors, setDoctors] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.auth);

  const onSearch = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/profile/doctor/search?search=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <div>
      <Search
        placeholder="Search doctor"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div className="card">
        <div className="card-body">
          {Doctors &&
            Doctors.slice(startIndex, endIndex).map((e, idx) => (
              <DoctorSearchCard key={idx} doctor={e} />
            ))}
        </div>
      </div>
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={currentPage}
        total={Doctors ? Doctors.length : 0}
        pageSize={itemsPerPage}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Doctors;
