const Patient = require("../models/Patient");
const Radiography = require("../models/Radiography");

// Add an allergy to a patient
exports.addRadiography = async (req, res) => {
  const data = { ...req.body };
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (req.file) {
      data.Result = req.file.filename;
    }
    const radiography = new Radiography(data);
    radiography.Patient = patientId;

    const savedRadiography = await radiography.save();
    patient.Radiography.push(savedRadiography._id);
    await patient.save();

    res.status(201).json(savedRadiography);
    console.log(savedRadiography);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all allergies of a patient
exports.getRadiography = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const radiography = await Radiography.find({ Patient: patientId });
    res.status(200).json(radiography);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// // Update an allergy of a patient
// exports.updateAllergy = async (req, res) => {
//   try {
//     const allergyId = req.params.allergyId;
//     const updatedAllergy = await Allergy.findByIdAndUpdate(
//       allergyId,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedAllergy);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Delete an allergy of a patient
exports.deleteRadiography = async (req, res) => {
  try {
    const radiographyId = req.params.radiographyId;
    const radiography = await Radiography.findByIdAndDelete(radiographyId);
    if (!radiography) {
      return res.status(404).json({ message: "radiography not found" });
    }

    const patient = await Patient.findById(radiography.Patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patient.Radiography.indexOf(radiographyId);
    if (index > -1) {
      patient.Radiography.splice(index, 1);
      await patient.save();
    }

    res.status(200).json({ message: "Radiography deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};