import React, { useState } from "react";
import PatientsPendingList from "../Components/PatientsPendingList";
import DoctorsPendingList from "../Components/DoctorsPendingList";

const RegistrationRequests = () => {
  return (
    <div>
      <PatientsPendingList />
      <DoctorsPendingList />
    </div>
  );
};

export default RegistrationRequests;
