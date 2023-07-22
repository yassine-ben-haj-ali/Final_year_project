const mongoose=require("mongoose");
const AdminSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  Lastname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
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

  Password: {
    type: String,
    require: true,
    min: 6,
  },
  Picture: {
    type: String,
    default: "",
    required: false,
  },
  Gender: {
    type: String,
    enum: ["male", "female"],
    default: "female",
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
