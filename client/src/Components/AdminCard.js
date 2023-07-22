import React from "react";
import userImg from "../assets/avatars/avatar-1.png";
const AdminCard = ({ Data }) => {
  return (
    <div>
      <div>
        <div class="card shadow-sm border-0 overflow-hidden">
          <div class="card-body">
            <div class="profile-avatar text-center">
              <img
                src={
                  Data.Picture
                    ? `http://localhost:8800/Assets/{Data.Picture}`
                    : userImg
                }
                class="rounded-circle shadow"
                width="120"
                height="120"
                alt=""
              />
            </div>
             
            <div class="text-center mt-4">
              <h4 class="mb-1"></h4>
              <p class="mb-0 text-secondary">{`${Data?.Firstname} ${Data?.Lastname}`}</p>
              <div class="mt-4"></div>
              <h6 class="mb-1">HR Manager - Codervent Technology</h6>
              <p class="mb-0 text-secondary">
                University of Information Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
