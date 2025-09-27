const User = require("../models/user");

const updateStudentDetails = async (req, res) => {
  try {
    const {crn, urn, room, branch, batch, mobile, fatherName, motherName, address, fatherPhoneNo, hostelNo, messAccount } = req.body;

    const result = await User.findByIdAndUpdate(req.user._id, {
        crn: crn,
        urn: urn,
        room: room,
        branch: branch,
        batch: batch,
        mobile: mobile,
        fatherName: fatherName,
        motherName: motherName,
        address: address,
        fatherPhoneNo: fatherPhoneNo,
        hostelNo: hostelNo,
        messAccount: messAccount,
     });

    if (!result) {
      return res.status(500).json({ message: "Maybe user doesn't exist" });
    }
    
    res.status(200).json({ message: "Student details updated successfully!" });
  } catch (err) {
    console.error("Error in updating student details.", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id);
    if (!userData) {
      return res.status(404).json({ message: "Student details Not Found!" });
    }
    return res.status(200).json({ userData });
  } catch (err) {
    console.error("Error occured in fetching student detail", err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};


// SuperAdmin: Assign role to any user
const assignUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    // Only allow valid roles
    const validRoles = ["student", "admin", "superAdmin", "careTaker", "messManager"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: `Role updated to ${role} for user ${user.email}.`, user });
  } catch (err) {
    console.error("Error assigning user role:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { updateStudentDetails, getStudentDetails, assignUserRole };
