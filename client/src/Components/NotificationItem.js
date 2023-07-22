import React from "react";
import { format } from "timeago.js";

const NotificationItem = ({ Notification}) => {
  return (
    <a class="dropdown-item" href="#">
      <div class="d-flex align-items-center">
        <div class="ms-3 flex-grow-1">
          <h6 class="mb-0 dropdown-msg-user">
            New Notification{" "}
            <span class="msg-time float-end text-secondary">{`${format(Notification.Date)}`}</span>
          </h6>
          <small class="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">
            {Notification.Message}
          </small>
        </div>
      </div>
    </a>
  );
};

export default NotificationItem;
