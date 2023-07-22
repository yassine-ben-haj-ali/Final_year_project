import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import DoctorCard from "../Components/DoctorCard";
import ChatEmpty from "../Components/ChatEmpty";
import Messenger from "../Components/Messenger";
import "./style.css";



const DoctorProfile = () => {
  const { DoctorID } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();
  const [chatWindow, setChatWindow] = useState(false);
  const [Conversations, setConversations] = useState();
  const [ConversationID, setConversationID] = useState();

  useEffect(() => {
    const ConversationsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/conversation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const ProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/profile/doctor/?doctorID=${DoctorID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    ConversationsData();
    ProfileData();
  }, []);

  useEffect(() => {
    setConversationID(
      Conversations?.find((e) => e?.other?.members?.includes(DoctorID))
    );
  }, [Conversations]);

  return (
    <div className="row">
      <div className="col-lg-4">
        {Data && (
          <DoctorCard
            Data={Data.data}
            Followings={Data.Followings}
            setChatWindow={setChatWindow}
            chatWindow={chatWindow}
          />
        )}
      </div>
      <div className="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div>
              <h3 class="card-title mb-4">About</h3>
            </div>
            {Data&&<p class="card-text">{Data.data?.Description}</p>}
          </div>
        </div>
      </div>
      {chatWindow && ConversationID && (
        <div className="messenger">
          <Messenger
            conversation={
              ConversationID?.other ? ConversationID.other._id : ConversationID
            }
            setChatWindow={setChatWindow}
            receiverID={DoctorID}
            picture={Data.data.Picture}
            username={`${Data.data.Firstname} ${Data.data.Lastname}`}
          />
        </div>
      )}
      {chatWindow && !ConversationID && (
        <div className="messenger">
          <ChatEmpty
            receiverID={DoctorID}
            setConversationID={setConversationID}
            setChatWindow={setChatWindow}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
