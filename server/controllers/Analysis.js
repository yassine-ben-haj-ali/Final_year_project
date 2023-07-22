const Patient = require("../models/Patient");
const Analysis = require("../models/Analysis");

// Add an allergy to a patient
exports.addAnalysis = async (req, res) => {
  const data={...req.body};
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if(req.file){
      data.Result=req.file.filename;
    }
    const analysis = new Analysis(data);
    analysis.Patient = patientId;

    const savedAnalysis = await analysis.save();
    patient.Analysis.push(savedAnalysis._id);
    await patient.save();

    res.status(201).json(savedAnalysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all allergies of a patient
exports.getAnalysis = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const analysis = await Analysis.find({ Patient: patientId });
    res.status(200).json(analysis);
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
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysisId = req.params.analysisId;
    const analysis = await Analysis.findByIdAndDelete(analysisId);
    if (!analysis) {
      return res.status(404).json({ message: "analysis not found" });
    }

    const patient = await Patient.findById(analysis.Patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patient.Analysis.indexOf(analysisId);
    if (index > -1) {
      patient.Analysis.splice(index, 1);
      await patient.save();
    }

    res.status(200).json({ message: "Analysis deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
