const route = require("express").Router();
const {
  addAnalysis,
  getAnalysis,
  deleteAnalysis,
} = require("../controllers/Analysis");
const { verifyToken } = require("../middleware/Authorization");
const { upload } = require("../middleware/Upload");

route.post("/:patientId", verifyToken, upload.single("file"), addAnalysis);
route.get("/:patientId", verifyToken, getAnalysis);
route.delete("/:analysisId", verifyToken, deleteAnalysis);
module.exports = route;
