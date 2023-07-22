import React from "react";
import MessageItem from "./MessageItem";

const MessagesBox = ({ Conversations, MessageCount, setMessageCount }) => {
  console.log(Conversations);
  return (
    <li class="nav-item dropdown dropdown-large">
      <a
        class="nav-link dropdown-toggle dropdown-toggle-nocaret"
        href="#"
        data-bs-toggle="dropdown"
      >
        <div class="messages" onClick={() => setMessageCount(0)}>
          <span class="notify-badge">{MessageCount}</span>
          <i class="bi bi-chat-right-fill"></i>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-end p-0">
        <div class="p-2 border-bottom m-2">
          <h5 class="h5 mb-0">Messages</h5>
        </div>

        <div class="header-message-list p-2">
          {Conversations &&
            Conversations.map((e, idx) => <MessageItem data={e} key={idx} />)}
        </div>

        <div class="p-2">
          <div>
            <hr class="dropdown-divider" />
          </div>
          <a class="dropdown-item" href="#">
            <div class="text-center">View All Messages</div>
          </a>
        </div>
      </div>
    </li>
  );
};

export default MessagesBox;
