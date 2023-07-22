const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createMessage = async (req, res) => {
  const { receiverID, content, conversationID } = req.body;
  let conversation;

  if (!conversationID) {
    try {
      conversation = await Conversation.findOne({
        members: { $all: [req.user.id, receiverID] },
      });

      if (!conversation) {
        const newConversation = new Conversation({
          members: [req.user.id, receiverID],
        });
        conversation = await newConversation.save();
      }
    } catch (err) {
      res.status(501).json(err);
      return;
    }
  } else {
    try {
      conversation = await Conversation.findById(conversationID);
      if (!conversation) {
        res.status(404).json({ error: "Conversation not found" });
        return;
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  }

  try {
    const message = new Message({
      sender: req.user.id,
      receiver: receiverID,
      content: content,
      conversationID: conversation._id,
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message)
  }
};

exports.getConversationMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationID: req.params.conversationID,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
