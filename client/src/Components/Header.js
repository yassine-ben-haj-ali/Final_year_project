import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessagesBox from "./MessagesBox";
import NotificationBox from "./NotificationBox";
import userImg from "../assets/avatars/avatar-1.png";
import { useDispatch } from "react-redux";
import { logoutAction, subscribeSocket } from "../Actions/authActions";
import io from "socket.io-client";
import axios from "axios";

const Header = () => {
  const { user, Socket, token} = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);
  const [MessageCount, setMessageCount] = useState(0);
  const [Notifications, setNotifications] = useState([]);
  const [Conversations, setConversations] = useState([]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const getNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/notification/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getConversations = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/conversation/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8800");
    dispatch(subscribeSocket(newSocket));
    getNotifications();
    getConversations();
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!Socket) return;
    Socket.on("connection", () => {
      console.log("user connected");
    });
    Socket.emit("addUser", user._id);

    Socket.on("disconnect", () => {
      console.log("disconnect");
    });
    Socket.on("follow_request_notification", async (data) => {
      setCount((prev) => prev + 1);
      pushNotification(data);
    });
    Socket.on("reject_request_notification", async (data) => {
      setCount((prev) => prev + 1);
      pushNotification(data);
    });
    Socket.on("approve_request_notification", async (data) => {
      setCount((prev) => prev + 1);
      pushNotification(data);
    });
    Socket.on("getMessage", async (data) => {
      setMessageCount((prev) => prev + 1);
      getConversations();
    });
    Socket.on("message-sent", async (data) => {
      getConversations();
    });

    Socket.on("arrival_notifications", async (data) => {
      if (data.length > 0) {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/notification/",
            {
              notifications: data,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCount(count + 1);
          setNotifications((prev) => [...res.data, ...prev]);
          // Emit the event to remove the arrival notification
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Data is empty or undefined");
      }
    });
  }, [Socket]);

  const pushNotification = async (content) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/notification/",
        {
          notifications: [{ UserID: user._id, Message: content }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prev) => [...res.data, ...prev]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header class="top-header">
      <nav class="navbar navbar-expand gap-3">
        <div class="mobile-toggle-icon fs-3">
          <i class="bi bi-list"></i>
        </div>
        <div class="top-navbar-right ms-auto">
          <ul class="navbar-nav align-items-center">
            <MessagesBox
              Conversations={Conversations}
              MessageCount={MessageCount}
              setMessageCount={setMessageCount}
            />
            <NotificationBox
              Notifications={Notifications}
              count={count}
              setCount={setCount}
            />
          </ul>
        </div>
        <div class="dropdown dropdown-user-setting">
          <a
            class="dropdown-toggle dropdown-toggle-nocaret"
            href="#"
            data-bs-toggle="dropdown"
          >
            <div class="user-setting d-flex align-items-center gap-3">
              <img
                src={
                  user?.picture
                    ? `http://localhost:8800/Assets/${user.picture}`
                    : userImg
                }
                class="user-img"
                alt=""
              />
              <div class="d-none d-sm-block">
                <p class="user-name mb-0">{user.email}</p>
                <small class="mb-0 dropdown-user-designation">
                  {user.role}
                </small>
              </div>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="/">
                <div class="d-flex align-items-center">
                  <div class="">
                    <i class="bi bi-person-fill"></i>
                  </div>
                  <div class="ms-3">
                    <span>Profile</span>
                  </div>
                </div>
              </a>
            </li>
            {user.role!=="admin"&&<li>
              <a class="dropdown-item" href={user.role==="patient"?"/patient/edit":"/doctor/edit"}>
                <div class="d-flex align-items-center">
                  <div class="">
                    <i class="bi bi-gear-fill"></i>
                  </div>
                  <div class="ms-3">
                    <span>Settings</span>
                  </div>
                </div>
              </a>
            </li>}
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" onClick={handleLogout} href="">
                <div class="d-flex align-items-center">
                  <div class="">
                    <i class="bi bi-lock-fill"></i>
                  </div>
                  <div class="ms-3">
                    <span>Logout</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
