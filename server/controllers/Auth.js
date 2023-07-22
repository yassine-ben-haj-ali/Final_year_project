const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { Firstname, Lastname, Email, Password, Speciality, Gender, Role } =
    req.body;
  try {
    if (Role === "doctor") {
      const doctor = await Doctor.findOne({ Email });
      if (doctor) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const patient = await Patient.findOne({ Email });
      if (patient) {
        return res
          .status(400)
          .json({ message: "Email already registered as patient" });
      }
      const admin = await Admin.findOne({ Email });
      if (admin) {
        return res
          .status(400)
          .json({ message: "Email already registered as admin" });
      }
      const hashedPassword = await bcrypt.hash(
        Password,
        Number(process.env.SALT)
      );

      // Create the new patient
      const newDoctor = await Doctor.create({
        Firstname,
        Lastname,
        Email,
        Password: hashedPassword,
        Speciality,
        Gender,
      });

      // Return success message and the new patient's details
      return res.status(201).json({
        message: "Doctor signup successful",
        doctor: {
          id: newDoctor._id,
          email: newDoctor.Email,
        },
      });
    } else if (Role === "patient") {
      const patient = await Patient.findOne({ Email });
      if (patient) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const doctor = await Doctor.findOne({ Email });
      if (doctor) {
        return res
          .status(400)
          .json({ message: "Email already registered as doctor" });
      }
      const admin = await Admin.findOne({ Email });
      if (admin) {
        return res
          .status(400)
          .json({ message: "Email already registered as admin" });
      }

      // Hash the password before storing in database
      const hashedPassword = await bcrypt.hash(
        Password,
        Number(process.env.SALT)
      );

      // Create the new doctor
      const newPatient = await Patient.create({
        Firstname,
        Lastname,
        Email,
        Password: hashedPassword,
        Gender,
      });

      // Return success message and the new doctor's details
      return res.status(201).json({
        message: "Patient signup successful",
        patient: {
          id: newPatient._id,
          email: newPatient.Email,
        },
      });
    } else if (Role == "admin") {
      const admin = await Admin.findOne({ Email });
      if (admin) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const doctor = await Doctor.findOne({ Email });
      if (doctor) {
        return res
          .status(400)
          .json({ message: "Email already registered as doctor" });
      }
      const patient = await Patient.findOne({ Email });
      if (patient) {
        return res
          .status(400)
          .json({ message: "Email already registered as patient" });
      }

      // Hash the password before storing in database
      const hashedPassword = await bcrypt.hash(
        Password,
        Number(process.env.SALT)
      );

      // Create the new doctor
      const newAdmin = await Admin.create({
        Firstname,
        Lastname,
        Email,
        Password: hashedPassword,
        Gender,
      });

      // Return success message and the new doctor's details
      return res.status(201).json({
        message: "Admin signup successful",
        admin: {
          id: newAdmin._id,
          email: newAdmin.Email,
        },
      });
    }
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

exports.Login = async (req, res) => {
  const { Email, Password, Role } = req.body;
  if (!Email || !Password) {
    return res
      .status(400)
      .json({ message: "Please provide your email and password." });
  }
  try {
    if (Role == "doctor") {
      const doctor = await Doctor.findOne({ Email });
      if (!doctor) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      const isMatch = await bcrypt.compare(Password, doctor.Password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      if (doctor.Status == "pending") {
        return res
          .status(401)
          .json({
            message: "you account is not confirmed by the administrator.",
          });
      }
      // Generate a JSON Web Token
      const token = jwt.sign(
        {
          id: doctor._id,
          email: doctor.Email,
          firstname: doctor.Firstname,
          id: doctor._id,
          role: "doctor",
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      return res.status(200).json({
        token,
        informations: {
          _id: doctor._id,
          email: doctor.Email,
          role: "doctor",
          picture: doctor.Picture,
        },
      });
    } else if (Role === "patient") {
      const patient = await Patient.findOne({ Email });
      if (!patient) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      const isMatch = await bcrypt.compare(Password, patient.Password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      if (patient.Status == "pending") {
        return res
          .status(401)
          .json({
            message: "you account is not confirmed by the administrator.",
          });
      }
      // Generate a JSON Web Token
      const token = jwt.sign(
        {
          id: patient._id,
          email: patient.Email,
          firstname: patient.Firstname,
          role: "patient",
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      return res.status(200).json({
        token,
        informations: {
          _id: patient._id,
          email: patient.Email,
          role: "patient",
          picture: patient.Picture,
        },
      });
    } else if (Role === "admin") {
      const admin = await Admin.findOne({ Email });
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      const isMatch = await bcrypt.compare(Password, admin.Password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      // Generate a JSON Web Token
      const token = jwt.sign(
        {
          id: admin._id,
          email: admin.Email,
          firstname: admin.Firstname,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      return res.status(200).json({
        token,
        informations: {
          _id: admin._id,
          email: admin.Email,
          role: "admin",
          picture: admin.Picture,
        },
      });
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};
