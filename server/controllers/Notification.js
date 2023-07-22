const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ UserID: req.user.id });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json(err);
  }
};

// exports.pushNotification = async (req, res) => {
//   try {
//     const notification = new Notification({
//       UserID: req.body.UserID,
//       Message: req.body.message,
//     });
//     const savedNotification = await notification.save();
//     res.status(201).json(savedNotification);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.pushNotification = async (req, res) => {
  try {
    const notifications = req.body.notifications;

    const savedNotifications = [];

    for (const notification of notifications) {
      const newNotification = new Notification({
        UserID: notification.UserID,
        Message: notification.Message,
      });
      const savedNotification = await newNotification.save();
      savedNotifications.push(savedNotification);
    }
    res.status(200).json(savedNotifications);
  } catch (err) {
    res.status(404).json(err);
  }
};
