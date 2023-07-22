import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatEmpty = ({ receiverID,setConversationID,setChatWindow}) => {
  const [content, setContent] = useState("");
  const { token } = useSelector((state) => state.auth);
  console.log("first")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await axios.post(
        "http://localhost:8800/api/message/",
        {
          receiverID,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversationID(message.data.conversationID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="card">
        <div
          className="card-header d-flex justify-content-between align-items-center p-3"
          style={{ borderTop: "4px solid #0d6efd" }}
        >
          <h5 className="mb-0">Chat messages</h5>
          <div className="d-flex flex-row align-items-center">
          <i class="fadeIn animated bx bx-window-close" style={{width:"20%"}} onClick={()=>setChatWindow(false)}></i>
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
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                For what reason would it be advisable for me to think about
                business content?
              </p>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                similique quae consequatur
              </p>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                similique quae consequatur
              </p>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                similique quae consequatur
              </p>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                similique quae consequatur
              </p>
            </div>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="small mb-1">Timona Siera</p>
            <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "100%" }}
            />
            <div>
              <p
                className="small p-2 ms-3 mb-3 rounded-3"
                style={{ backgroundColor: "#f5f6f7" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                similique quae consequatur
              </p>
            </div>
          </div> */}
        </div>

        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
          <div class="input-group mb-0">
            <input
              className="form-control"
              placeholder="Type message"
              type="text"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              style={{ paddingTop: ".55rem" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatEmpty;
