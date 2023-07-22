import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientCard from "../Components/PatientCard";
import "./style.css";
import ChatEmpty from "../Components/ChatEmpty";
import Messenger from "../Components/Messenger";
import PatientMedicalFolder from "../Components/PatientMedicalFolder";

const PatientProfile = () => {
  const { PatientID } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [Data, setData] = useState();
  const [chatWindow, setChatWindow] = useState(false);
  const [Conversations, setConversations] = useState();
  const [ConversationID, setConversationID] = useState();
  const [folderWindow, setFolderWindow] = useState(false);

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
    console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    const ProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/profile/patient/?patientID=${PatientID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log("test",response.data);
      } catch (err) {
        console.log(err);
      }
    };
    ProfileData();
    ConversationsData();
  }, []);
  useEffect(() => {
    setConversationID(
      Conversations?.find((e) => e?.other?.members?.includes(PatientID))
    );
  }, [Conversations]);

  return (
    <div>
      {Data && (
        <PatientCard
          Data={Data.data}
          Followers={Data.Followers}
          setChatWindow={setChatWindow}
          folderWindow={folderWindow}
          setFolderWindow={setFolderWindow}
          chatWindow={chatWindow}
        />
      )}
      {chatWindow && ConversationID && (
        <div className="messenger">
          <Messenger
            conversation={
              ConversationID?.other ? ConversationID.other._id : ConversationID
            }
            setChatWindow={setChatWindow}
            receiverID={PatientID}
            picture={Data.data.Picture}
            username={`${Data.data.Firstname} ${Data.data.Lastname}`}
          />
        </div>
      )}
      {chatWindow && !ConversationID && (
        <div className="messenger">
          <ChatEmpty
            receiverID={PatientID}
            setConversationID={setConversationID}
            setChatWindow={setChatWindow}
          />
        </div>
      )}
      {folderWindow && <PatientMedicalFolder id={PatientID} />}
    </div>
  );
};

export default PatientProfile;
