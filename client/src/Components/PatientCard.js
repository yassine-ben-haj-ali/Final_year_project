import React from "react";
import ActionButtons from "./ActionButtons";

const PatientCard = ({
  Data,
  Followers,
  setChatWindow,
  chatWindow,
  folderWindow,
  setFolderWindow,
}) => {
  return (
    <div>
      <div>
        <div class="card shadow-sm border-0 overflow-hidden">
          <div class="card-body">
            <div class="profile-avatar text-center">
              <img
                src={`http://localhost:8800/Assets/${Data?.Picture}`}
                class="rounded-circle shadow"
                width="120"
                height="120"
                alt=""
              />
            </div>
            <div class="text-center mt-4">
              <h4 className="mb-1">{`${Data?.Firstname} ${Data?.Lastname}`}</h4>
              <p className="mb-0 text-secondary">{Data?.Email}</p>

              <p className="mb-1 mt-3">
                <strong>Phone:</strong>
                {Data?.Phone ? Data.Phone : ""}
              </p>
              <p className="mb-1 mt-1">
                <strong>Address:</strong>
                {Data?.Address}
              </p>
              <p className="mb-1 mt-1">
                <strong>Location:</strong>{" "}
                {Data?.Country ? Data?.Country : "Country"}-
                {Data?.City ? Data.City : "City"}-
                {Data?.Pincode ? Data?.Pincode : "Pincode"}
              </p>
              <p className="mb-0 text-secondary">
                <strong>Gender:</strong>
                {Data?.Gender}
              </p>
              <div class="mt-4">
                {Data && (
                  <ActionButtons
                    Followers={Followers}
                    Data={Data}
                    folderWindow={folderWindow}
                    setFolderWindow={setFolderWindow}
                    setChatWindow={setChatWindow}
                    chatWindow={chatWindow}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
