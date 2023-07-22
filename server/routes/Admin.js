const route = require("express").Router();
const { AdminProfile } = require("../controllers/Admin");
const { verifyToken, verifyAdmin } = require("../middleware/Authorization");

route.get("/", verifyToken, verifyAdmin, AdminProfile);

module.exports = route;
