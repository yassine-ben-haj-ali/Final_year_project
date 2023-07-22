const mongoose = require("mongoose");

const RadiographySchema = new mongoose.Schema({
  Type: {
    type: String,
    required: false,
  },
  Name: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  Reason: {
    type: String,
    required: false,
  },
  Result: {
    type: String,
    required: false,
  },
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

module.exports = mongoose.model("Radiography", RadiographySchema);
