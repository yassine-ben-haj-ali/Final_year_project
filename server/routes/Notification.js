const route = require("express").Router();
const {
  getNotifications,
  pushNotification,
} = require("../controllers/Notification");
const { verifyToken } = require("../middleware/Authorization");

route.get("/", verifyToken, getNotifications);
route.post("/", verifyToken, pushNotification);
module.exports = route;
