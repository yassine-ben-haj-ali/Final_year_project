import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminCard from "../Components/AdminCard";
import userImg from "../assets/avatars/avatar-1.png";
const AdminProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/profile/admin/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    ProfileData();
  }, []);
  return (
    <div>
      {Data && <AdminCard Data={Data} />}
    </div>
  );
};

export default AdminProfile;
