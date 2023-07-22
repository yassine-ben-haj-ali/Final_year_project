const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: false,
  },
  Message: {
    type: String,
    required: false,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notification", NotificationSchema);
