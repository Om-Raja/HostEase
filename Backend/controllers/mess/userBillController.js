const User = require("../../models/user.js");
const MonthBill = require("../../models/mess.js");

const getBill = async (req, res) => {
    try {
        const { month } = req.query;
        const userId = req.user._id;

        if (!month || !userId) return res.status(400).json({ message: "month and userId is required" });

        const monthlyBill = await MonthBill.find({ month, user: userId });
        if (!monthlyBill) return res.status(404).json({ message: "No monthly bill for this user" });

        const student = await User.findById(userId);
        if (!student) return res.status(404).json({ message: "No student exist with this id" });
        const totalBill = student.currentMessBill;
        const messAccount = student.messAccount;

        return res.json({ totalBill, monthlyBill, messAccount });

    } catch (err) {
        console.log("Problem in fetching monthlyBill or totalBill");
        console.error(err);
    }
}

module.exports = getBill;