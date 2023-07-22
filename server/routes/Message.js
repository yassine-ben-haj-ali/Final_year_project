const route = require("express").Router();
const {
  createMessage,
  getConversationMessages,
} = require("../controllers/Message");
const { verifyToken } = require("../middleware/Authorization");

route.post("/", verifyToken, createMessage);
route.get("/:conversationID", verifyToken, getConversationMessages);
module.exports = route;
