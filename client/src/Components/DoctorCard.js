import React from "react";
import FollowButton from "./FollowButton";

const DoctorCard = ({ Data, Followings, setChatWindow, chatWindow }) => {
  return (
    <div>
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="card-body">
          <div className="profile-avatar text-center">
            <img
              src={`http://localhost:8800/Assets/${Data?.Picture}`}
              className="rounded-circle shadow"
              width="120"
              height="120"
              alt=""
            />
          </div>
          <div className="text-center mt-4">
            <h4 className="mb-1">{`${Data?.Firstname} ${Data?.Lastname}`}</h4>
            <p className="mb-0 text-secondary">{Data?.Speciality}</p>

            <p className="mb-1 mt-1"><strong>Phone:</strong>{Data?.Phone ? Data.Phone : ""}</p>
            <p className="mb-1 mt-1"><strong>Address:</strong>{Data?.Address}</p>
            <p className="mb-1 mt-1">
              <strong>Location:</strong> {Data?.Country ? Data?.Country : "Country"}-
              {Data?.City ? Data.City : "City"}-
              {Data?.pinCode ? Data?.pinCode : "Pincode"}
            </p>
            <p className="mb-0 text-secondary"><strong>Gender:</strong>{Data?.Gender}</p>
            <div className="mt-4">
              {Followings && (
                <FollowButton
                  Followings={Followings}
                  Data={Data}
                  setChatWindow={setChatWindow}
                  chatWindow={chatWindow}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
