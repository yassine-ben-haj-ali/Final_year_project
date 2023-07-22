import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
const Messenger = ({
  conversation,
  setChatWindow,
  receiverID,
  username,
  picture,
}) => {
  const [Messages, setMessages] = useState([]);
  const { token, Socket, user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    if (!Socket) return;
    Socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
        receiver: data.receiverId,
      });
    });
  }, [Socket]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: user._id,
      content,
      conversationID: conversation,
    };

    try {
      const message = await axios.post(
        "http://localhost:8800/api/message/",
        { ...newMessage, receiverID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...Messages, message.data]);
      Socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: receiverID,
        content,
      });
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/message/${conversation}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversation]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);
  return (
    <div className="chat">
      <div className="card">
        <div
          className="card-header d-flex justify-content-between align-items-center p-3"
          style={{ borderTop: "4px solid #0d6efd" }}
        >
          <h5 className="mb-0">Chat messages</h5>
          <div className="d-flex flex-row align-items-center">
            <i
              class="fadeIn animated bx bx-window-close"
              style={{ width: "20%" }}
              onClick={() => setChatWindow(false)}
            ></i>
          </div>
        </div>
        <div
          className="card-body"
          style={{
            height: "400px",
            overflowY: "scroll",
            paddingRight: "10px",
          }}
        >
          {Messages?.map((e, idx) => (
            <div ref={scrollRef}>
              <Message
                key={idx}
                data={e}
                username={username}
                picture={picture}
              />
            </div>
          ))}
        </div>

        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
          <div class="input-group mb-0">
            <input
              className="form-control"
              placeholder="Type message"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ paddingTop: ".55rem" }}
              onClick={(e) => handleSubmit(e)}
            >
              {" "}
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
