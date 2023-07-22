const Allergy = require("../models/Allergy");
const Patient = require("../models/Patient");

// Add an allergy to a patient
exports.addAllergy = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const allergy = new Allergy(req.body);
    allergy.Patient = patientId;

    const savedAllergy = await allergy.save();
    patient.Allergies.push(savedAllergy._id);
    await patient.save();

    res.status(201).json(savedAllergy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all allergies of a patient
exports.getAllergies = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const allergies = await Allergy.find({ Patient: patientId });
    res.status(200).json(allergies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an allergy of a patient
exports.updateAllergy = async (req, res) => {
  try {
    const allergyId = req.params.allergyId;
    const updatedAllergy = await Allergy.findByIdAndUpdate(
      allergyId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAllergy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an allergy of a patient
exports.deleteAllergy = async (req, res) => {
  try {
    const allergyId = req.params.allergyId;
    const allergy = await Allergy.findByIdAndDelete(allergyId);
    if (!allergy) {
      return res.status(404).json({ message: "Allergy not found" });
    }

    const patient = await Patient.findById(allergy.Patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patient.Allergies.indexOf(allergyId);
    if (index > -1) {
      patient.Allergies.splice(index, 1);
      await patient.save();
    }

    res.status(200).json({ message: "Allergy deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};