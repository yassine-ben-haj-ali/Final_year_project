const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
exports.PatientProfile = async (req, res) => {
  try {
    if (req.user.role === "patient") {
      const patient = await Patient.findById(req.user.id);
      if (!patient) {
        return res.status(404).json("patient not found");
      }
      return res.status(200).json({
        data: patient,
      });
    } else if (req.user.role == "doctor") {
      const patient = await Patient.findById(req.query.patientID);
      if (!patient) {
        return res.status(404).json("patient not found");
      }
      const doctor = await Doctor.findById(req.user.id);

      return res.status(200).json({
        data: patient,
        Followers: doctor.Followers,
      });
    } else {
      const patient = await Patient.findById(req.query.patientID);
      if (!patient) {
        return res.status(404).json("patient not found");
      }
      return res.status(200).json({ data: patient });
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.searchPatient = async (req, res) => {
  let search = req.query.search || ""; // query string entered by user
  let regex = new RegExp(search, "i"); // case-insensitive regex for matching query

  try {
    if (req.user.role === "admin") {
      const Patients = await Patient.find({
        $or: [
          { Firstname: { $regex: regex } },
          { Lastname: { $regex: regex } },
          { Email: { $regex: regex } },
        ],
      });
      return res.status(200).json(Patients);
    } else if (req.user.role === "doctor") {
      const patients = await Patient.find({
        $and: [
          {
            $or: [
              { Firstname: { $regex: regex } },
              { Lastname: { $regex: regex } },
              { Email: { $regex: regex } },
            ],
          },
          { Status: "approved" },
        ],
      });
      return res.status(200).json(patients);
    } else {
      return res.status(400).json("you can't search here");
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.PatientList = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ patients });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.EditPatientProfile = async (req, res) => {
  const updatedData = { ...req.body };
  try {
    if (req.file) {
      updatedData.Picture = req.file.filename;
    }
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.user.id,
      {
        $set: updatedData,
      },
      { new: true }
    );
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.PatientsList = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json({ patients });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.patientsFilter = async (req, res) => {
  try {
    if (req.query.status === "approved") {
      const patients = await Patient.find({ Status: "approved" });
      return res.status(200).json({ patients });
    }
    const patients = await Patient.find({ Status: "pending" });
    return res.status(200).json({ patients });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.approvePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: "patient not found" });
    }
    if (patient.Status === "approved") {
      return res.status(400).json({ msg: "patient has already been approved" });
    }
    patient.Status = "approved";
    await patient.save();
    res.json({ msg: "Patient approved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    await patient.remove();
    res.json({ msg: "Patient deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
