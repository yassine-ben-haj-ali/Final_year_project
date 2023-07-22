import React from "react";
import { useSelector } from "react-redux";
import {format} from "timeago.js"
const ChatMessage = ({ data, username, picture }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("chat message",data);
  return (
    <div>
      {data && data?.sender == user._id ? (
        <div class="d-flex flex-row justify-content-end">
          <div>
            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
              {data.content}
            </p>
            <p class="small me-3 mb-3 rounded-3 text-muted">
            {`${format(data.createdAt)}`}
            </p>
          </div>
          <img
            src={`http://localhost:8800/Assets/${user.picture}`}
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
          />
        </div>
      ) : (
        <div class="d-flex flex-row justify-content-start">
          <img
            src={`http://localhost:8800/Assets/${picture}`}
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
          />
          <div>
            <p
              class="small p-2 ms-3 mb-1 rounded-3"
              style={{ backgroundColor: "#f5f6f7" }}
            >
              {data?.content}
            </p>
            <p class="small ms-3 mb-3 rounded-3 text-muted float-end">
            {`${format(data.createdAt)}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
