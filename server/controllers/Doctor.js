const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
exports.DoctorProfile = async (req, res) => {
  try {
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findById(req.user.id).populate("Speciality");
      if (!doctor) {
        return res.status(404).json("doctor not found");
      }
      return res.status(200).json({
        data: { ...doctor._doc, Speciality: doctor.Speciality.Name },
      });
    } else if (req.user.role == "admin") {
      const doctor = await Doctor.findById(req.query.doctorID).populate(
        "Speciality"
      );
      if (!doctor) {
        return res.status(404).json("doctor not found");
      }
      return res.status(200).json({
        data: { ...doctor._doc, Speciality: doctor.Speciality.Name },
      });
    } else {
      const doctor = await Doctor.findById(req.query.doctorID).populate(
        "Speciality"
      );
      if (!doctor) {
        return res.status(404).json("doctor not found");
      }
      const patient = await Patient.findById(req.user.id);
      return res.status(200).json({
        data: { ...doctor._doc, Speciality: doctor.Speciality },
        Followings: patient.Followings,
      });
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.EditDoctorProfile = async (req, res) => {
  const updatedData = { ...req.body };
  try {
    if (req.file) {
      updatedData.Picture = req.file.filename;
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.user.id,
      {
        $set: updatedData,
      },
      { new: true }
    );
    res.status(200).json(updatedDoctor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.searchDoctor = async (req, res) => {
  let search = req.query.search || ""; // query string entered by user
  console.log(req.query.search);
  let regex = new RegExp(search, "i"); // case-insensitive regex for matching query

  try {
    if (req.user.role === "admin") {
      const doctors = await Doctor.find({
        $or: [
          { Firstname: { $regex: regex } },
          { Lastname: { $regex: regex } },
          { Email: { $regex: regex } },
          { Speciality: { $regex: regex } },
        ],
      });
      return res.status(200).json(doctors);
    } else if (req.user.role === "patient") {
      const doctors = await Doctor.find({
        $and: [
          {
            $or: [
              { Firstname: { $regex: regex } },
              { Lastname: { $regex: regex } },
              { Email: { $regex: regex } },
              { Speciality: { $regex: regex } },
            ],
          },
          { Status: "approved" },
        ],
      });
      return res.status(200).json(doctors);
    } else {
      return res.status(400).json("you can't search here");
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.DoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json({ doctors });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.doctorsFilter = async (req, res) => {
  try {
    if (req.query.status === "approved") {
      const doctors = await Doctor.find({ Status: "approved" });
      return res.status(200).json({ doctors });
    }
    const doctors = await Doctor.find({ Status: "pending" });
    return res.status(200).json({ doctors });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    if (doctor.Status === "approved") {
      return res.status(400).json({ msg: "Doctor has already been approved" });
    }
    doctor.Status = "approved";
    await doctor.save();
    res.json({ msg: "Doctor approved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    await doctor.remove();
    res.json({ msg: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPendingList = async (req, res, next) => {
  try {
    const doctorId = req.user.id; // Assuming you can retrieve the doctor's ID from the request parameters

    // Find the doctor by ID and populate the Followers field with pending followers
    const doctor = await Doctor.findById(doctorId).populate({
      path: "Followers",
      match: { status: "pending" },
      populate: {
        path: "PatientID",
        select: "Firstname Lastname Picture _id",
      },
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const pendingFollowers = doctor.Followers.filter(
      (follower) => follower.status === "pending"
    );

    res.json(pendingFollowers);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.rejectFollower = async (req, res) => {
  const { patientId } = req.body;

  try {
    const doctor = await Doctor.findById(req.user.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find the follower by patientId and update their status to "approved"
    const follower = doctor.Followers.find(
      (follower) => follower.PatientID.toString() === patientId
    );

    const followerIndex = doctor.Followers.findIndex(
      (follower) => follower.PatientID.toString() === patientId
    );

    if (followerIndex === -1) {
      return res.status(404).json({ error: "Follower not found" });
    }

    doctor.Followers.splice(followerIndex, 1);
    await doctor.save();

    res.json({ message: "Follower rejected successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.approveFollower = async (req, res) => {
  const { patientId } = req.body;

  try {
    const doctor = await Doctor.findById(req.user.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find the follower by patientId and update their status to "approved"
    const follower = doctor.Followers.find(
      (follower) => follower.PatientID.toString() === patientId
    );

    if (!follower) {
      return res.status(404).json({ error: "Follower not found" });
    }

    follower.status = "approved";
    await doctor.save();

    res.json({ message: "Follower approved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
