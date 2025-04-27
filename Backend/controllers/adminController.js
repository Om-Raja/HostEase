const User = require("../models/user");

const getAllStudentData = async (req, res) => {
    try {
        const careTaker = await User.findById(req.user._id); // Added await
        if (!careTaker) {
            return res.status(404).json({ message: "Caretaker not found in the database." });
        }

        const allStudent = await User.find({ role: "student", hostelNo: careTaker.hostelNo });
        if (!allStudent || allStudent.length === 0) {
            return res.status(404).json({ message: "No student data found for this hostel." });
        }

        res.status(200).json({ message: "Student data retrieved successfully.", students: allStudent });
    } catch (err) {
        console.error("Error occurred in fetching student details:", err);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
}

module.exports = {getAllStudentData};