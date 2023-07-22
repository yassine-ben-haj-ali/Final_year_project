const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: false,
  },
  Pincode: {
    type: String,
    required: false,
  },
  Country: {
    type: String,
    required: false,
  },
  Address: {
    type: String,
    required: false,
  },
  Birthday: {
    type: Date,
    required: false,
  },
  Phone: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  Followings: [
    {
      DoctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
      },
      Status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending",
      },
    },
  ],
  Password: {
    type: String,
    require: true,
    min: 6,
  },
  Picture: {
    type: String,
    required: false,
    default: function () {
      return this.Gender === "female" ? "avatar-20.png" : "avatar-5.png";
    },
  },
  Gender: {
    type: String,
    enum: ["male", "female"],
    default: "female",
  },
  Allergies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Allergy",
    },
  ],
  Analysis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
    },
  ],
  Antecedents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Antecedent",
    },
  ],
  Diseases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
    },
  ],
  Radiography: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Radiography",
    },
  ],
  createdAt: { type: Date, default: Date.now },

  Status: {
    type: String,
    enum: ["approved", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
