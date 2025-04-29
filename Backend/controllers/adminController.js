const User = require("../models/user");

const getAllStudentData = async (req, res) => {
  try {
    const careTaker = await User.findById(req.user._id);
    if (!careTaker) {
      return res
        .status(404)
        .json({ message: "Caretaker not found in the database." });
    }

    const allStudent = await User.find({
      role: "student",
      hostelNo: careTaker.hostelNo,
    });
    if (!allStudent || allStudent.length === 0) {
      return res
        .status(404)
        .json({ message: "No student data found for this hostel." });
    }

    res
      .status(200)
      .json({
        message: "Student data retrieved successfully.",
        students: allStudent,
      });
  } catch (err) {
    console.error("Error occurred in fetching student details:", err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const updateStudentDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedStudentDetail = await User.findByIdAndUpdate(
      userId,
      { room: req.body.room, hostelNo: req.body.hostelNo },
      { new: true, runValidators: true },
    );
    if (!updatedStudentDetail) {
      return res
        .status(400)
        .json({ message: "Invalid or missing student id" });
    }
    res.status(200).json({ message: "Student Detail updated successfully" });
  } catch (err) {
    console.error(`Error in updating student's room or hostel. for ID ${req.params.id}. Error: ${err}`);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { getAllStudentData, updateStudentDetail };
