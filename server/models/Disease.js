const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  Speciality: {
    type: String,
    required: false,
  },
  Name: {
    type: String,
    required: true,
  },
  Genetic: {
    type: Boolean,
    default: false,
    required: false,
  },
  ChronicDisease: {
    type: Boolean,
    default: false,
    required: false,
  },
  DetectedIn: {
    type: String,
    required: false,
  },
  CuredIn: {
    type: String,
    required: false,
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

module.exports = mongoose.model("Disease", DiseaseSchema);
