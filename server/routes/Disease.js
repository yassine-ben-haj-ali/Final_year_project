const route = require("express").Router();
const {
  addDisease,
  deleteDisease,
  updateDisease,
  getDiseases,
} = require("../controllers/Disease");
const { verifyToken } = require("../middleware/Authorization");

route.post("/:patientId", verifyToken, addDisease);
route.delete("/:diseaseId", verifyToken, deleteDisease);
route.put("/:diseaseId", verifyToken, updateDisease);
route.get("/:patientId", verifyToken, getDiseases);
module.exports = route;
