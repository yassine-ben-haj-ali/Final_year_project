const mongoose = require("mongoose");

const AnalysiSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  Indicators: [
    {
      Indicator: {
        type: String,
        required: false,
      },
      Value: {
        type: String,
        required: false,
      },
    },
  ],

  Result: {
    type: String,
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

module.exports = mongoose.model("Analysis", AnalysiSchema);
