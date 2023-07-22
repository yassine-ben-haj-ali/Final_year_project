const Conversation = require("../models/Conversation");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Message = require("../models/Message");



exports.userConversations = async (req, res) => {
  try {
    const conversations = await Conversation.aggregate([
      { $match: { members: { $in: [req.user.id] } } },
      {
        $lookup: {
          from: "messages",
          let: { conversationId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$conversationID", "$$conversationId"] },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: "lastMessage",
        },
      },
      {
        $project: {
          _id: 1,
          members: 1,
          updatedAt: 1,
          lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
        },
      },
      { $sort: { "lastMessage.createdAt": -1 } },
    ]);

    const conversation = conversations.map(async (e) => {
      const secondMember = e.members.find((user) => user != req.user.id);
      const patient = await Patient.findById(secondMember);
      let user = null;
      if (patient) {
        user = patient;
      } else {
        const doctor = await Doctor.findById(secondMember);
        if (doctor) {
          user = doctor;
        }
      }

      return {
        FirstName: user.Firstname,
        LastName: user.Lastname,
        Picture: user.Picture,
        other: { _id: e._id, updatedAt: e.updatedAt ,members:e.members},
        lastMessage: e.lastMessage || null, // include the last message or null if no message found
      };
    });

    const result = await Promise.all(conversation);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
