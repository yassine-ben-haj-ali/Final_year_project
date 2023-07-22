const route = require("express").Router();
const {
  PatientProfile,
  searchPatient,
  PatientList,
  EditPatientProfile,
  patientsFilter,
  approvePatient,
  deletePatient,
} = require("../controllers/Patient");
const { verifyToken, verifyAdmin } = require("../middleware/Authorization");
const { upload } = require("../middleware/Upload");
route.get("/", verifyToken, PatientProfile);
route.get("/search", verifyToken, searchPatient);
route.get("/list",verifyToken,verifyAdmin,PatientList);
route.get("/filter", verifyToken, verifyAdmin, patientsFilter);
route.put("/edit",verifyToken,upload.single("file"),EditPatientProfile);
route.put("/approve/:id", verifyToken, verifyAdmin, approvePatient);
route.delete("/delete/:id", verifyToken, verifyAdmin, deletePatient);
module.exports = route;
