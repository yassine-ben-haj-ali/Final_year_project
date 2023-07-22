const route = require("express").Router();
const {
  addAntecedent,
  deleteAntecedent,
  getAntecedents,
} = require("../controllers/Antecedent");
const { verifyToken } = require("../middleware/Authorization");

route.post("/:patientId", verifyToken, addAntecedent);
route.delete("/:antecedentId", verifyToken, deleteAntecedent);
route.get("/:patientId", verifyToken, getAntecedents);
module.exports = route;
