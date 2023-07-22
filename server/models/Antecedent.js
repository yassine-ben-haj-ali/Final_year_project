const mongoose = require("mongoose");

const AntecedentSchema = new mongoose.Schema({
  Relationship: {
    type: String,
    required: true,
  },
  Disease: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
    required: false,
  },
  Doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: false,
  },
  Patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

module.exports = mongoose.model("Antecedent", AntecedentSchema);
