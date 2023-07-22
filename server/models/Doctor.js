const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
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
  Country: {
    type: String,
    required: false,
  },
  Pincode: {
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
    maxlength: 50,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
    minlength: 6,
  },
  Picture: {
    type: String,
    default: function () {
      return this.Gender === "female" ? "avatar-12.png" : "avatar-1.png";
    },
    required: false,
  },
  Followers: [
    {
      PatientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending",
      },
    },
  ],
  Description: {
    type: String,
    maxlength: 300,
  },
  Speciality: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ["male", "female"],
    default: "female",
  },
  Status: {
    type: String,
    enum: ["approved", "pending"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
