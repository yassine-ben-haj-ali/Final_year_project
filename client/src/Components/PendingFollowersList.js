import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PendingFollowersList = () => {
  const [Followers, setFollowers] = useState();
  const { token, Socket, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getFollowers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/profile/doctor/followers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = async (follower) => {
    try {
      await axios.post(
        "http://localhost:8800/api/profile/doctor/approve-follower",
        {
          doctorId: user._id,
          patientId: follower.PatientID._id,
          // additional parameters here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getFollowers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (follower) => {
    try {
      await axios.post(
        "http://localhost:8800/api/reject-follower",
        {
          doctorId: user._id,
          patientId: follower.PatientID._id,
          // additional parameters here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getFollowers();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <div>
      {Followers &&
        Followers.map((e, idx) => (
          <div className="col" key={idx}>
            <div className="card border">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2 col-md-3 border-0">
                    <img
                      src={`http://localhost:8800/Assets/${e.PatientID.Picture}`}
                      alt="patient"
                      width="150px"
                    />
                  </div>
                  <div className="col-lg-10 col-md-9">
                    <div className="row">
                      <div>
                        <h6 className="mb-2">{`${e.PatientID.Firstname} ${e.PatientID.Lastname}`}</h6>

                        <button
                          type="button"
                          className="btn btn-primary px-5 m-3"
                          onClick={() => {
                            Socket.emit("Approve_request", {
                              DoctorID: user._id,
                              PatientID: e.PatientID._id,
                              // additional parameters here
                            });
                            handleApprove(e);
                          }}
                        >
                          approve
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger px-5 m-3"
                          onClick={() => {
                            Socket.emit("Reject_request", {
                              DoctorID: user._id,
                              PatientID: e.PatientID._id,
                              // additional parameters here
                            });
                            handleReject(e);
                          }}
                        >
                          reject
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary px-5 m-3"
                          onClick={() =>
                            navigate(`/patients/${e.PatientID._id}`)
                          }
                        >
                          view profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PendingFollowersList;
