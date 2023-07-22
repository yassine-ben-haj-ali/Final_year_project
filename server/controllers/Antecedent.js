const Antecedent = require("../models/Antecedent");
const Patient = require("../models/Patient");

// Add an allergy to a patient
exports.addAntecedent = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const antecedent = new Antecedent(req.body);
    antecedent.Patient = patientId;

    const savedAntecedent = await antecedent.save();
    patient.Antecedents.push(savedAntecedent._id);
    await patient.save();

    res.status(201).json(savedAntecedent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all allergies of a patient
exports.getAntecedents = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const antecedents = await Antecedent.find({ Patient: patientId });
    res.status(200).json(antecedents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// // // Update an allergy of a patient
// // exports.updateDisease = async (req, res) => {
// //   try {
// //     const diseaseId = req.params.diseaseId;
// //     const updatedDisease = await Disease.findByIdAndUpdate(
// //       diseaseId,
// //       req.body,
// //       { new: true }
// //     );
// //     res.status(200).json(updatedDisease);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// Delete an allergy of a patient
exports.deleteAntecedent = async (req, res) => {
  try {
    const antecedentId = req.params.antecedentId;
    const antecedent = await Antecedent.findByIdAndDelete(antecedentId);
    if (!antecedent) {
      return res.status(404).json({ message: "antecedent not found" });
    }

    const patient = await Patient.findById(antecedent.Patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patient.Antecedents.indexOf(antecedentId);
    if (index > -1) {
      patient.Antecedents.splice(index, 1);
      await patient.save();
    }

    res.status(200).json({ message: "Antecedent deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
