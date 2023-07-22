import React from "react";
import userIMG from "../assets/avatars/avatar-1.png";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, List } from "antd";
import moment from "moment";

const { Meta } = Card;

const PatientSearchCard = ({ patient }) => {
  const navigate = useNavigate();
  return (
    <Card
      key={patient._id}
      cover={
        <img
          alt="example"
          src={`http://localhost:8800/Assets/${patient.Picture}`}
        />
      }
      bodyStyle={{ padding: "24px 16px" }}
      actions={[
        <Button
          type="primary"
          onClick={() => navigate(`/patients/${patient._id}`)}
        >
          View Profile
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar src={`http://localhost:8800/Assets/${patient.Picture}`} />
        }
        title={`${patient.Firstname} ${patient.Lastname}`}
        style={{ marginBottom: 16 }}
      />
      <List
        size="small"
        bordered
        dataSource={[
          {
            label: "Birthday",
            value: patient.Birthday
              ? moment(patient.Birthday).format("MMMM Do YYYY")
              : "-",
          },
          { label: "Phone", value: patient.Phone ? patient.Phone : "-" },
          { label: "Email", value: patient.Email },
        ]}
        renderItem={({ label, value }) => (
          <List.Item>
            <strong>{label}:</strong> {value}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default PatientSearchCard;
// <div>
//   <div key={patient._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
//     <div className="card py-3 py-md-3">
//       <div className="d-flex justify-content-between px-2 px-md-2">
//         <img
//           src={userIMG}
//           alt=""
//           height="55px"
//           width="55px"
//           className="rounded-circle"
//         />
//         <div>
//           <h6
//             style={{
//               fontSize: "1rem!important",
//               fontWeight: "500!important",
//               color: "#4caf50!important",
//             }}
//           >
//             {`${patient.Firstname} ${patient.Lastname}`}
//           </h6>
//           <p>patient id:123</p>
//         </div>
//         <div>
//           <h6>10:00-10:00AM</h6>
//           <p className="grey">Firday,June 26</p>
//         </div>
//       </div>
//       <hr className="light-hr" />
//       <div className="d-flex flex-column justify-content-start w-100 px-3 px-md-4">
//         <div>
//           <i className="fas fa-map-marker-alt pt-3 psr-3" />
//           Shanti Nagar Bldg No B 4, Sector No 6, Mira Road
//         </div>
//         <div>
//           <i className="fas fa-phone pt-3 psr-3"></i>
//           +123 87654565
//         </div>
//       </div>
//       <hr className="light-hr" />
//       <div className="d-flex justify-content-between px-3 px-md-4"></div>
//       <hr className="light-hr" />
//       <div className="d-flex justify-content-around px-4">
//         <button
//           className="mdc-button mdc-button--outlined mat-mdc-outlined-button mat-primary mat-mdc-button-base"
//           onClick={() => navigate(`/patients/${patient._id}`)}
//         >
//           view more{" "}
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
