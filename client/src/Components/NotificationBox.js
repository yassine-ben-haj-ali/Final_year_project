import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationBox = ({ Notifications, count,setCount}) => {
  return (
    <li class="nav-item dropdown dropdown-large">
      <a
        class="nav-link dropdown-toggle dropdown-toggle-nocaret"
        href="#"
        data-bs-toggle="dropdown"
      >
        <div class="notifications" onClick={()=>setCount(0)}>
          <span class="notify-badge">{count}</span>
          <i class="bi bi-bell-fill"></i>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-end p-0">
        <div class="p-2 border-bottom m-2">
          <h5 class="h5 mb-0">Notifications</h5>
        </div>
        <div class="header-notifications-list p-2">
          {Notifications &&
            Notifications.map((e, idx) => (
              <NotificationItem key={idx} Notification={e} />
            ))}
        </div>
        <div class="p-2">
          <div>
            <hr class="dropdown-divider" />
          </div>
          <a class="dropdown-item" href="#">
            <div class="text-center">View All Notifications</div>
          </a>
        </div>
      </div>
    </li>
  );
};

export default NotificationBox;
