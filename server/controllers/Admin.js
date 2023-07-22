const Admin = require("../models/Admin");
exports.AdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json("admin not found");
    }
    return res.status(200).json(admin);
  } catch (err) {
    res.status(501).json(err.message);
  }
};
