import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ActionButtons = ({
  Data,
  Followers,
  setChatWindow,
  chatWindow,
  folderWindow,
  setFolderWindow,
}) => {
  const [Follower, setFollower] = useState([]);
  const [Follow, setFollow] = useState();
  const { user, Socket } = useSelector((state) => state.auth);
  useEffect(() => {
    if (Followers) {
      setFollower(Followers);
    }
  }, [Followers]);
  useEffect(() => {
    const follow = Follower?.find(
      (doc) => doc.PatientID.toString() === Data._id
    );

    setFollow(follow);
  }, [Follower]);

  useEffect(() => {
    if (!Socket) return;
    Socket.on("cancel_request_success", (data) => {
      console.log(data);
      const follow = data?.find((doc) => doc.PatientID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("follow_request_success", (data) => {
      const follow = data?.find((doc) => doc.PatientID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("unfollow_request_success", (data) => {
      const follow = data?.find((doc) => doc.PatientID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("Approve_request_success", (data) => {
      const follow = data?.find((doc) => doc.PatientID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("reject_request_success", (data) => {
      const follow = data?.find((doc) => doc.PatientID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("disconnect", () => {
      console.log("disconnect");
    });
  }, [Socket]);
  console.log(Follow);
  return (
    <div>
      {Follow && Follow.status == "pending" && (
        <>
          <button
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
            onClick={() => {
              Socket.emit("Approve_request", {
                DoctorID: user._id,
                PatientID: Data._id,
                // additional parameters here
              });
            }}
          >
            Approve
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              Socket.emit("Reject_request", {
                DoctorID: user._id,
                PatientID: Data._id,
                // additional parameters here
              });
            }}
          >
            Reject
          </button>
        </>
      )}
      {Follow && Follow.status == "approved" && (
        <>
          <button
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
            onClick={() => setChatWindow(!chatWindow)}
          >
            send message
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => setFolderWindow(!folderWindow)}
          >
            <i class="bi bi-person-circle"></i>dossier médical
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
