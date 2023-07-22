// const Doctor = require("../models/Doctor");
// const Patient = require("../models/Patient");

// const sendFollow = async (data, io) => {
//   const { DoctorID, PatientID } = data;
//   try {
//     let DoctorSocket = getUser(DoctorID);
//     let PatientSocket = getUser(PatientID);
//     const doctor = await Doctor.findById(DoctorID);
//     if (!doctor) {
//       io.to(PatientSocket?.socketId).emit(
//         "follow_request_error",
//         "doctor not found"
//       );
//       return;
//     }
//     const patient = await Patient.findById(PatientID).populate(
//       "Followings.DoctorID",
//       "Speciality");
//     if (!patient) {
//       io.to(PatientSocket?.socketId).emit(
//         "follow_request_error",
//         "patient not found"
//       );
//       return;
//     }
//     const followingDoctor = patient.Followings.find(
//       (doc) => doc.DoctorID.Speciality === doctor.Speciality
//     );
//     if (followingDoctor) {
//       io.to(PatientSocket?.socketId).emit(
//         "follow_request_error",
//         "you followed or you send a follow request to another doctor who have the same speciality"
//       );
//       return;
//     }
//     const isFollowing = patient.Followings.find(
//       (doc) => doc.DoctorID._id.toString() === DoctorID
//     );
//     if (isFollowing) {
//       io.to(PatientSocket?.socketId).emit(
//         "follow_request_error",
//         "you followed this doctor"
//       );
//       return;
//     }

//     // Create a new follow request
//     patient.Followings.push({ DoctorID: DoctorID, Status: "pending" });
//     await patient.save();

//     // Add the patient to the doctor's followers
//     doctor.Followers.push({ PatientID, status: "pending" });
//     await doctor.save();

//     io.to(PatientSocket?.socketId).emit(
//       "follow_request_success",
//       patient.Followings
//     );
//     console.log("success");

//     io.to(DoctorSocket?.socketId).emit(
//       "follow_request_success",
//       doctor.Followers
//     );
//     if (DoctorSocket) {
//       io.to(DoctorSocket?.socketId).emit(
//         "follow_request_notification",
//         "you have a new follow request"
//       );
//     } else {
//       // addNotification(
//       //   DoctorID,
//       //   `you have a new follow request from ${patient.Firstname}`
//       // );
//     }
//   } catch (err) {
//     io.to(PatientSocket?.socketId).emit("follow_request_error", err);
//     return;
//   }
// };

// const ApproveRequest = async (data, io) => {
//   const { DoctorID, PatientID } = data;
//   let DoctorSocket = getUser(DoctorID);
//   let PatientSocket = getUser(PatientID);
//   try {
//     const doctor = await Doctor.findById(DoctorID);
//     const patient = await Patient.findById(PatientID);

//     if (!doctor || !patient) {
//       io.to(DoctorSocket?.socketId).emit(
//         "Approve_request_error",
//         "patient or doctor not found"
//       );
//       return;
//     }

//     const followRequest = doctor.Followers.find(
//       (doc) => doc.PatientID.toString() === PatientID.toString()
//     );
//     if (!followRequest) {
//       io.to(DoctorSocket?.socketId).emit(
//         "Approve_request_error",
//         "you don't have a follow request from this patient"
//       );
//       return;
//     }

//     followRequest.status = "approved";
//     await doctor.save();

//     const following = patient.Followings.find(
//       (f) => f.DoctorID.toString() === DoctorID.toString()
//     );
//     following.Status = "approved";
//     await patient.save();
//     io.to(PatientSocket?.socketId).emit(
//       "Approve_request_success",
//       patient.Followings
//     );
//     io.to(DoctorSocket?.socketId).emit(
//       "Approve_request_success",
//       doctor.Followers
//     );
//     if (PatientSocket) {
//       io.to(PatientSocket?.socketId).emit(
//         "approve_request_notification",
//         `your follow request has been approved by the doctor ${doctor.Firstname}`
//       );
//     } else {
//     }
//   } catch (error) {
//     return;
//   }
// };

// const cancelRequest = async (data, io) => {
//   const { DoctorID, PatientID } = data;
//   try {
//     const patient = await Patient.findById(PatientID);
//     const doctor = await Doctor.findById(DoctorID);
//     if (!patient || !doctor) {
//       return;
//     }

//     const followingRequest = patient.Followings.find(
//       (f) => f.DoctorID.toString() == DoctorID && f.Status === "pending"
//     );

//     if (!followingRequest) {
//       return;
//     }
//     patient.Followings = patient.Followings.filter(
//       (f) => f.DoctorID.toString() != DoctorID && f.Status != "pending"
//     );
//     await patient.save();
//     const followRequest = doctor.Followers.find(
//       (f) => f.PatientID.toString() == PatientID && f.status === "pending"
//     );
//     if (!followRequest) {
//       return;
//     }
//     doctor.Followers = doctor.Followers.filter(
//       (f) => f.PatientID.toString() !== PatientID && f.status == "pending"
//     );
//     await doctor.save();
//     const DoctorSocket = getUser(DoctorID);
//     const PatientSocket = getUser(PatientID);
//     io.to(PatientSocket?.socketId).emit(
//       "cancel_request_success",
//       patient.Followings
//     );
//     io.to(DoctorSocket?.socketId).emit(
//       "cancel_request_success",
//       doctor.Followers
//     );
//   } catch (error) {
//     return;
//   }
// };
// const rejectRequest=async(data,io)=>{
//     const { DoctorID, PatientID } = data;
//     try {
//       const doctor = await Doctor.findById(DoctorID);
//       const patient = await Patient.findById(PatientID);
//       if (!doctor || !patient) {
//         return;
//       }

//       const followRequest = doctor.Followers.find(
//         (doc) =>
//           doc.PatientID.toString() === PatientID.toString() &&
//           doc.status === "pending"
//       );
//       if (!followRequest) {
//         return;
//       }
//       doctor.Followers = doctor.Followers.filter(
//         (doc) => doc.PatientID.toString() !== PatientID.toString()
//       );
//       await doctor.save();

//       // Remove from Followings array of Patient Model
//       patient.Followings = patient.Followings.filter(
//         (f) => f.DoctorID.toString() !== DoctorID.toString()
//       );
//       await patient.save();
//       const DoctorSocket = getUser(DoctorID);
//       const PatientSocket = getUser(PatientID);
//       console.log(DoctorSocket, PatientSocket);
//       io.to(PatientSocket?.socketId).emit(
//         "reject_request_success",
//         patient.Followings
//       );
//       io.to(DoctorSocket?.socketId).emit(
//         "reject_request_success",
//         doctor.Followers
//       );

//       if (PatientSocket) {
//         io.to(PatientSocket?.socketId).emit(
//           "reject_request_notification",
//           `your follow request has been rejected by the doctor ${doctor.Firstname}`
//         );
//       } else {
//       }
//     } catch (err) {
//       return;
//     }
  
// }
// const unfollow=async(data,io)=>{

// const { DoctorID, PatientID } = data;

//       try {
//         const patient = await Patient.findById(PatientID);
//         const doctor = await Doctor.findById(DoctorID);
//         if (!patient || !doctor) {
//           return;
//         }
//         const following = patient.Followings.find(
//           (follow) =>
//             follow.DoctorID.toString() === DoctorID.toString() &&
//             follow.Status === "approved"
//         );

//         if (!following) {
//           return;
//         }

//         // remove the doctor from patient's Followings
//         patient.Followings = patient.Followings.filter(
//           (follow) => follow.DoctorID.toString() !== DoctorID.toString()
//         );

//         // remove the patient from doctor's Followers
//         doctor.Followers = doctor.Followers.filter(
//           (follow) =>
//             follow.PatientID.toString() !== PatientID.toString() &&
//             follow.status !== "approved"
//         );

//         await patient.save();
//         await doctor.save();
//         const DoctorSocket = getUser(DoctorID);
//         const PatientSocket = getUser(PatientID);
//         io.to(PatientSocket?.socketId).emit(
//           "unfollow_request_success",
//           patient.Followings
//         );
//         io.to(DoctorSocket?.socketId).emit(
//           "unfollow_request_success",
//           doctor.Followers
//         );
//       } catch (err) {
//         return;
//       }
//     }

//       let users = [];
// // let notifications = [];

// // const addNotification = (UserID, Message) => {
// //   notifications.push({ UserID, Message });
// // };

// // const getUserNotifications = (userId) => {
// //   const userNotifications = notifications.filter(
// //     (notification) => notification.UserID === userId
// //   );
// //   notifications = notifications.filter(
// //     (notification) => notification.UserID !== userId
// //   );
// //   return userNotifications;
// // };

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };
// const realtime = (io) => {
//   io.on("connection", (socket) => {
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//       //   io.to(socket.id).emit(
//       //     "arrival_notifications",
//       //     getUserNotifications(userId)
//       //   );
//     });

//     socket.on("sendMessage", ({ senderId, receiverId, content }) => {
//       const receiverSocket = getUser(receiverId);
//       const senderSocket = getUser(senderId);
//       io.to(receiverSocket?.socketId).emit("getMessage", {
//         senderId,
//         receiverId,
//         content,
//       });
//       io.to(senderSocket?.socketId).emit("message-sent", {
//         senderId,
//         receiverId,
//         content,
//       });
//     });

//     socket.on("follow", async (data) => sendFollow(data, io));

//     socket.on("Approve_request", async (data) => ApproveRequest(data, io));

//     socket.on("cancel_request", async (data) => cancelRequest(data, io));

//     socket.on("unfollow", async (data) => unfollow(data,io));

//     socket.on("Reject_request", async (data) => rejectRequest(data,io));
//     socket.on("disconnect", () => {
//       console.log("a user disconnected!");
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
//   });
// };

// module.exports = realtime;



const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

let users = [];
let notifications = [];

const addNotification = (UserID, Message) => {
  notifications.push({ UserID, Message });
};


const getUserNotifications = (userId) => {
  const userNotifications = notifications.filter(
    (notification) => notification.UserID === userId
  );
  notifications = notifications.filter(
    (notification) => notification.UserID !== userId
  );
  return userNotifications;
};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const realtime = (io) => {
  io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
      io.to(socket.id).emit(
        "arrival_notifications",
        getUserNotifications(userId)
      );
    });

    
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
      const receiverSocket = getUser(receiverId);
      const senderSocket = getUser(senderId);
      io.to(receiverSocket?.socketId).emit("getMessage", {
        senderId,
        receiverId,
        content,
      });
      io.to(senderSocket?.socketId).emit("message-sent", {
        senderId,
        receiverId,
        content,
      });
    });

    socket.on("Approve_request", async (data) => {
      const { DoctorID, PatientID } = data;
      try {
        const doctor = await Doctor.findById(DoctorID);
        const patient = await Patient.findById(PatientID);
        if (!doctor || !patient) {
          return;
        }

        const followRequest = doctor.Followers.find(
          (doc) => doc.PatientID.toString() === PatientID.toString()
        );
        if (!followRequest) {
          return;
        }

        followRequest.status = "approved";
        await doctor.save();

        const following = patient.Followings.find(
          (f) => f.DoctorID.toString() === DoctorID.toString()
        );
        following.Status = "approved";
        await patient.save();
        const DoctorSocket = getUser(DoctorID);
        const PatientSocket = getUser(PatientID);
        io.to(PatientSocket?.socketId).emit(
          "Approve_request_success",
          patient.Followings
        );
        io.to(DoctorSocket?.socketId).emit(
          "Approve_request_success",
          doctor.Followers
        );
        if (PatientSocket) {
          io.to(PatientSocket?.socketId).emit(
            "approve_request_notification",
            
            `your follow request has been approved by the doctor ${doctor.Firstname}`
          );
        } else {
          addNotification(
            PatientID,
            `your follow request has been approved by the doctor ${doctor.Firstname}`
          );
        }
      } catch (error) {
        return;
      }
    });

    socket.on("cancel_request", async (data) => {
      const { DoctorID, PatientID } = data;
      try {
        const patient = await Patient.findById(PatientID);
        const doctor = await Doctor.findById(DoctorID);
        if (!patient || !doctor) {
         return;
        }

        const followingRequest = patient.Followings.find(
          (f) => f.DoctorID.toString() == DoctorID && f.Status === "pending"
        );

        if (!followingRequest) {
          return;
        }
        patient.Followings = patient.Followings.filter(
          (f) => f.DoctorID.toString() != DoctorID && f.Status != "pending"
        );
        await patient.save();
        const followRequest = doctor.Followers.find(
          (f) => f.PatientID.toString() == PatientID && f.status === "pending"
        );
        if (!followRequest) {
          return;
        }
        doctor.Followers = doctor.Followers.filter(
          (f) => f.PatientID.toString() !== PatientID && f.status == "pending"
        );
        await doctor.save();
        const DoctorSocket = getUser(DoctorID);
        const PatientSocket = getUser(PatientID);
        io.to(PatientSocket?.socketId).emit(
          "cancel_request_success",
          patient.Followings
        );
        io.to(DoctorSocket?.socketId).emit(
          "cancel_request_success",
          doctor.Followers
        );
      } catch (error) {
       return;
      }
    });

    socket.on("follow", async (data) => {
      const { DoctorID, PatientID } = data;

      try {
        const doctor = await Doctor.findById(DoctorID);
        if (!doctor) {
          return
        }
        const patient = await Patient.findById(PatientID).populate(
          "Followings.DoctorID",
          "Speciality"
        );

        if (!patient) {
          return;
        }
        const followingDoctor = patient.Followings.find(
          (doc) => doc.DoctorID.Speciality === doctor.Speciality
        );
        if (followingDoctor) {
          return;
        }
        const isFollowing = patient.Followings.find(
          (doc) => doc.DoctorID._id.toString() === DoctorID
        );
        if (isFollowing) {
          return;
        }

        // Create a new follow request
        patient.Followings.push({ DoctorID: DoctorID, Status: "pending" });
        await patient.save();

        // Add the patient to the doctor's followers
        doctor.Followers.push({ PatientID, status: "pending" });
        await doctor.save();
        const DoctorSocket = getUser(DoctorID);
        const PatientSocket = getUser(PatientID);
        io.to(PatientSocket?.socketId).emit(
          "follow_request_success",
          patient.Followings
        );
        io.to(DoctorSocket?.socketId).emit(
          "follow_request_success",
          doctor.Followers
        );
        if (DoctorSocket) {
          io.to(DoctorSocket?.socketId).emit(
            "follow_request_notification",
            "you have a new follow request"
          );
        } else {
          addNotification(
            DoctorID,
            `you have a new follow request from ${patient.Firstname}`
          );
        }
      } catch (err) {
        return;
      }
    });
    socket.on("unfollow", async (data) => {
      const { DoctorID, PatientID } = data;

      try {
        const patient = await Patient.findById(PatientID);
        const doctor = await Doctor.findById(DoctorID);
        if (!patient || !doctor) {
          return;
        }
        const following = patient.Followings.find(
          (follow) =>
            follow.DoctorID.toString() === DoctorID.toString() &&
            follow.Status === "approved"
        );

        if (!following) {
          return;
        }

        // remove the doctor from patient's Followings
        patient.Followings = patient.Followings.filter(
          (follow) => follow.DoctorID.toString() !== DoctorID.toString()
        );

        // remove the patient from doctor's Followers
        doctor.Followers = doctor.Followers.filter(
          (follow) =>
            follow.PatientID.toString() !== PatientID.toString() &&
            follow.status !== "approved"
        );

        await patient.save();
        await doctor.save();
        const DoctorSocket = getUser(DoctorID);
        const PatientSocket = getUser(PatientID);
        io.to(PatientSocket?.socketId).emit(
          "unfollow_request_success",
          patient.Followings
        );
        io.to(DoctorSocket?.socketId).emit(
          "unfollow_request_success",
          doctor.Followers
        );
      } catch (err) {
        return;
      }
    });

    socket.on("Reject_request", async (data) => {
      const { DoctorID, PatientID } = data;
      try {
        const doctor = await Doctor.findById(DoctorID);
        const patient = await Patient.findById(PatientID);
        if (!doctor || !patient) {
          return;
        }

        const followRequest = doctor.Followers.find(
          (doc) =>
            doc.PatientID.toString() === PatientID.toString() &&
            doc.status === "pending"
        );
        if (!followRequest) {
          return;
        }
        doctor.Followers = doctor.Followers.filter(
          (doc) => doc.PatientID.toString() !== PatientID.toString()
        );
        await doctor.save();

        // Remove from Followings array of Patient Model
        patient.Followings = patient.Followings.filter(
          (f) => f.DoctorID.toString() !== DoctorID.toString()
        );
        await patient.save();
        const DoctorSocket = getUser(DoctorID);
        const PatientSocket = getUser(PatientID);
        console.log(DoctorSocket, PatientSocket);
        io.to(PatientSocket?.socketId).emit(
          "reject_request_success",
          patient.Followings
        );
        io.to(DoctorSocket?.socketId).emit(
          "reject_request_success",
          doctor.Followers
        );

        if (PatientSocket) {
          io.to(PatientSocket?.socketId).emit(
            "reject_request_notification",
            `your follow request has been rejected by the doctor ${doctor.Firstname}`
          );
        } else {
          addNotification(
            PatientID,
            `your follow request has been rejected by the doctor ${doctor.Firstname}`
          );
        }
      } catch (err) {
        return;
      }
    });
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

module.exports = realtime;
