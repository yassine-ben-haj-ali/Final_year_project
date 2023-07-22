import React from "react";
import { format } from "timeago.js";

const MessageItem = ({ data }) => {
  console.log(data);
  return (
    <div>
      <a class="dropdown-item" href="#">
        <div class="d-flex align-items-center">
          <img
            src={`http://localhost:8800/Assets/${data?.Picture}`}
            alt=""
            class="rounded-circle"
            width="50"
            height="50"
          />
          <div class="ms-3 flex-grow-1">
            <h6 class="mb-0 dropdown-msg-user">
              {`${data.FirstName} ${data.LastName}`}{" "}
              <span class="msg-time float-end text-secondary">{`${format(data.lastMessage.createdAt)}`}</span>
            </h6>
            <small class="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">
            {data.lastMessage.content}
            </small>
          </div>
        </div>
      </a>
    </div>
  );
};

export default MessageItem;
