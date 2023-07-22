const Disease = require("../models/Disease");
const Patient = require("../models/Patient");

// Add an allergy to a patient
exports.addDisease = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const disease = new Disease(req.body);
    disease.Patient = patientId;

    const savedDisease = await disease.save();
    patient.Diseases.push(savedDisease._id);
    await patient.save();

    res.status(201).json(savedDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all allergies of a patient
exports.getDiseases = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const diseases = await Disease.find({ Patient: patientId });
    res.status(200).json(diseases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an allergy of a patient
exports.updateDisease = async (req, res) => {
  try {
    const diseaseId = req.params.diseaseId;
    const updatedDisease = await Disease.findByIdAndUpdate(
      diseaseId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an allergy of a patient
exports.deleteDisease = async (req, res) => {
  try {
    const diseaseId = req.params.diseaseId;
    const disease = await Disease.findByIdAndDelete(diseaseId);
    if (!disease) {
      return res.status(404).json({ message: "disease not found" });
    }

    const patient = await Patient.findById(disease.Patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patient.Diseases.indexOf(diseaseId);
    if (index > -1) {
      patient.Diseases.splice(index, 1);
      await patient.save();
    }

    res.status(200).json({ message: "Disease deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
