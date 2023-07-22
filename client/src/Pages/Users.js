import React from "react";
import ApprovedDoctors from "../Components/ApprovedDoctors";
import ApprovedPatients from "../Components/ApprovedPatients";

const Users = () => {
  return (
    <div>
      <div class="card">
        <div class="card-body">
          <div>
            <h3 class="card-title mb-4">Doctors List</h3>
          </div>
          <ApprovedDoctors />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div>
            <h3 class="card-title mb-4">Patients List</h3>
          </div>
          <ApprovedPatients />
        </div>
      </div>
    </div>
  );
};

export default Users;
