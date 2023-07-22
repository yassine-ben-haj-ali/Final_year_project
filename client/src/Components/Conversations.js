import React from "react";
import { useSelector } from "react-redux";
import {format} from "timeago.js"
const Conversations = ({
  data,
  setSelectedConversation,
  setUsername,
  setReceiverID,
  setPicture
}) => {
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    setSelectedConversation(data.lastMessage.conversationID);
    setUsername(`${data.FirstName} ${data.LastName}`);
    setPicture(data.Picture);
    const filteredMembers = data.other.members.filter(
      (e) => e.toString() !== user._id.toString()
    );
    if (filteredMembers.length > 0) {
      setReceiverID(filteredMembers[0]);
    }
  };
  return (
    <div
      onClick={() => {
        handleClick();
      }}
    >
      <li class="p-2 border-bottom">
        <a href="#!" class="d-flex justify-content-between">
          <div class="d-flex flex-row">
            <div>
              <img
                src={
                  data.Picture
                    ? `http://localhost:8800/Assets/${data.Picture}`
                    : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                }
                alt="avatar"
                class="d-flex align-self-center me-3"
                width="60"
              />
              <span class="badge bg-success badge-dot"></span>
            </div>
            <div class="pt-1">
              <p class="fw-bold mb-0">{`${data.FirstName} ${data.LastName}`}</p>
              <p class="small text-muted">{data.lastMessage.content}</p>
            </div>
          </div>
          <div class="pt-1">
            <p class="small text-muted mb-1">{`${format(data.lastMessage.createdAt)}`}</p>
          </div>
        </a>
      </li>
    </div>
  );
};

export default Conversations;
