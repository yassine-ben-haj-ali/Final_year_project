import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
const Message = ({ data, username, picture }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("messages", data);
  return (
    <div>
      {data && data?.sender == user._id ? (
        <div>
          <div class="d-flex justify-content-between">
            <p class="small mb-1 text-muted">{`${format(data.createdAt)}`}</p>
            <p class="small mb-1">you</p>
          </div>
          <div class="d-flex flex-row justify-content-end mb-4 pt-1">
            <div>
              <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-primary">
                {data.content}
              </p>
            </div>
            <img
              src={`http://localhost:8800/Assets/${user.picture}`}
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between">
            <p className="small mb-1">{username}</p>
            <p className="small mb-1 text-muted">{`${format(
              data.createdAt
            )}`}</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src={`http://localhost:8800/Assets/${picture}`}
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                {data?.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
