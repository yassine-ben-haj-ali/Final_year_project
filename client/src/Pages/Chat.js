import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Conversations from "../Components/Conversations";
import ChatMessage from "../Components/ChatMessage";
import { Button } from "antd";
const Chat = () => {
  const [Conversation, setConversation] = useState();
  const [Messages, setMessages] = useState();
  const { token, Socket, user } = useSelector((state) => state.auth);
  const [selectedConversation, setSelectedConversation] = useState();
  const [Username, setUsername] = useState();
  const [Picture, setPicture] = useState();
  const [content, setContent] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiverID, setReceiverID] = useState();
  const ConversationRef = useRef();
  const scrollRef = useRef();
  useEffect(() => {
    const ConversationsList = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    ConversationsList();
  }, []);
  useEffect(() => {
    const MessagesList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/message/${selectedConversation}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    MessagesList();
  }, [selectedConversation]);
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
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [Messages, arrivalMessage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: user._id,
      content,
      conversationID: selectedConversation,
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

  return (
    <div>
      <section>
        <div class="container py-5">
          <div class="row">
            <div class="col-md-12">
              <div class="card" id="chat3" style={{ borderRadius: "15px" }}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                      <div class="p-3">
                        {/* <div
                          data-mdb-perfect-scrollbar="true"
                          style={{ position: "relative", height: "400px" }}
                        > */}
                        <ul class="list-unstyled mb-0">
                          <div
                            className="card-body"
                            style={{
                              height: "400px",
                              overflowY: "scroll",
                              paddingRight: "10px",
                            }}
                          >
                            {Conversation &&
                              Conversation.map((e, idx) => (
                                <div ref={ConversationRef}>
                                  <Conversations
                                    key={idx}
                                    data={e}
                                    setSelectedConversation={
                                      setSelectedConversation
                                    }
                                    setUsername={setUsername}
                                    setReceiverID={setReceiverID}
                                    setPicture={setPicture}
                                  />
                                </div>
                              ))}
                          </div>
                        </ul>
                        {/* </div> */}
                      </div>
                    </div>

                    <div class="col-md-6 col-lg-7 col-xl-8">
                      {!selectedConversation ? (
                        <h1>select conversation ...</h1>
                      ) : (
                        <div>
                          <div
                            className="card-body"
                            style={{
                              height: "400px",
                              overflowY: "scroll",
                              paddingRight: "10px",
                            }}
                            ref={scrollRef}
                          >
                            {Messages &&
                              Messages.map((e, idx) => (
                                <ChatMessage
                                  key={idx}
                                  data={e}
                                  username={Username}
                                  picture={Picture}
                                />
                              ))}
                          </div>
                          <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                            <input
                              value={content}
                              type="text"
                              class="form-control form-control-lg"
                              id="exampleFormControlInput2"
                              placeholder="Type message"
                              onChange={(e) => setContent(e.target.value)}
                            />
                            <Button type="primary" onClick={handleSubmit}>
                              send
                            </Button>
                           
                           
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
