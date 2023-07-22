const mongoose = require("mongoose");

const AllergySchema = new mongoose.Schema({
  Type: {
    type: String,
    required: false,
  },
  Name: {
    type: String,
    required: true,
  },
  YearOfDiscovery: {
    type: String,
    required: false,
  },
  FollowupStatus: {
    type: String,
    required: false,
  },
  FamilyHistory: {
    type: Boolean,
    default: false,
    required: false,
  },
  Notes: {
    type: String,
    required: false,
  },
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

module.exports = mongoose.model("Allergy", AllergySchema);
