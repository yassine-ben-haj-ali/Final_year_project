import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";

const FollowButton = ({ Data,Followings,setChatWindow,chatWindow}) => {
  const [Following, setFollowing] = useState([]);
  const [Follow, setFollow] = useState();
  const { user, Socket } = useSelector((state) => state.auth);

  useEffect(() => {
    if (Data) {
      setFollowing(Followings);
    }
  }, [Data, user]);

  useEffect(() => {
    const follow = Following?.find(
      (doc) => doc.DoctorID.toString() === Data._id
    );
    setFollow(follow);
  }, [Following]);

  useEffect(() => {
    if (!Socket) return;
    Socket.on("cancel_request_success", (data) => {
      const follow = data?.find((doc) => doc.DoctorID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("follow_request_success", (data) => {
      const follow = data?.find((doc) => doc.DoctorID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("unfollow_request_success", (data) => {
      const follow = data?.find((doc) => doc.DoctorID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("Approve_request_success", (data) => {
      const follow = data?.find((doc) => doc.DoctorID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("reject_request_success", (data) => {
      const follow = data?.find((doc) => doc.DoctorID.toString() === Data._id);
      setFollow(follow);
    });
    Socket.on("disconnect", () => {
      console.log("disconnect");
    });
  }, [Socket]);
  return (
    <div>
      {Follow && Follow.Status == "pending" && (
        <button
          className="btn btn-danger px-5"
          onClick={() => {
            Socket.emit("cancel_request", {
              DoctorID: Data._id,
              PatientID: user._id,
            });
          }}
        >
          cancel follow request
        </button>
      )}
      {Follow && Follow.Status == "approved" && (
        <>
          <button
            class="btn btn-danger px-3"
            style={{ marginRight: "15px" }}
            onClick={() => {
              Socket.emit("unfollow", {
                DoctorID: Data._id,
                PatientID: user._id,
              });
            }}
          >
            unfollow
          </button>
          <button
            className="btn btn-outline-primary px-3"
            onClick={() => setChatWindow(!chatWindow)}
          >
            send message
          </button>
        </>
      )}
      {!Follow && (
        <button
          className="btn btn-primary px-5"
          onClick={() => {
            Socket.emit("follow", {
              DoctorID: Data._id,
              PatientID: user._id,
              // additional parameters here
            });
          }}
        >
          follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
