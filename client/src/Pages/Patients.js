import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Pagination } from "antd";
import PatientSearchCard from "../Components/PatientSearchCard";
const { Search } = Input;

const Patients = () => {
  const [Patients, setPatients] = useState();
  const { token } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const onSearch = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/profile/patient/search?search=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate start and end index of items to display based on current page and items per page
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <Search
        placeholder="Search patient"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div className="card">
        <div className="card-body">
          <div className="row">
            {Patients &&
              Patients.slice(startIndex, endIndex).map((e, idx) => (
                <div className="col-md-4" key={idx}>
                  <PatientSearchCard patient={e} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        current={currentPage}
        total={Patients ? Patients.length : 0}
        pageSize={itemsPerPage}
        onChange={onPageChange}
      />
    </div>
  );
};

export default Patients;
