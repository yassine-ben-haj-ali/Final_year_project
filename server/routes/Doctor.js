const route = require("express").Router();
const {
  DoctorProfile,
  searchDoctor,
  DoctorsList,
  doctorsFilter,
  approveDoctor,
  deleteDoctor,
  EditDoctorProfile,
  getPendingList,
  approveFollower,
  rejectFollower
} = require("../controllers/Doctor");

const { verifyToken, verifyAdmin } = require("../middleware/Authorization");
const { upload } = require("../middleware/Upload");
route.get("/", verifyToken, DoctorProfile);
route.get("/search", verifyToken, searchDoctor);
route.get("/list", verifyToken, verifyAdmin,DoctorsList);
route.put("/edit",verifyToken,upload.single("file"),EditDoctorProfile);
route.get("/filter", verifyToken,verifyAdmin,doctorsFilter);
route.get("/followers",verifyToken,getPendingList);
route.put('/approve/:id',verifyToken,verifyAdmin,approveDoctor);
route.delete('/delete/:id',verifyToken,verifyAdmin, deleteDoctor);
route.post("/approve-follower",verifyToken,approveFollower);
route.post("/reject-follower",verifyToken,rejectFollower);


module.exports = route;
