const User = require("../models/user");

const updateStudentDetails = async (req, res) => {
  try {
    const {crn, urn, room, branch, batch, mobile, fatherName, motherName, address, fatherPhoneNo, hostelNo } = req.body;

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
        hostelNo: hostelNo
     });

    if (!result) {
      return res.status(500).json({ message: "Maybe user doesn't exist" });
    }
    
    res.status(200).json({ message: "Student updated successfully!" });
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

module.exports = { updateStudentDetails, getStudentDetails };
