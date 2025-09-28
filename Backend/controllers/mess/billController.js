const MessBill = require("../../models/mess.js");
const Student = require("../../models/user.js");

const showBills = async (req, res) => {
  try {
    const manager = await Student.findById(req.user._id);
    if (!manager)
      return res.status(404).json({ message: "Manager details not found" });


    const students = await Student.find({
      role: "student",
      hostelNo: manager.hostelNo,
    });

    if (students) res.json({ students, message: "Bills fetched" });
    else res.json({ message: "No students found" });
  } catch (err) {
    console.log("Error in fetching bill");
    console.error("Error: ", err);

    res
      .status(500)
      .json({ message: "There was some problem in getting student details" });
  }
};

const addBill = async (req, res) => {
  try {
    const bill = req.body; //currentBill, totalBill, name, messAccount, month, studentId
    if (!bill)
      return res
        .status(400)
        .json({ message: "Month or Bill cannot be empty." });

    const newBill = new MessBill({
      user: bill.studentId,
      messAccount: bill.messAccount,
      currentBill: bill.currentBill,
      month: bill.month,
      name: bill.name,
    });
    await newBill.save();

    await Student.findByIdAndUpdate(bill.studentId, {
      currentMessBill: bill.totalBill,
    });

    res.status(201).json({ message: "Bill added" });
  } catch (err) {
    console.log("Error in adding bill controller");
    console.error("Error is : ", err);

    res
      .status(500)
      .json({ message: "There was an error in adding the bill. Try again" });
  }
};

const getBill = async (req, res) => {
  try {
    const month = req.query.month;

    const manager = await Student.findById(req.user._id);
    if (!manager)
      return res.status(404).json({ message: "Manager details not found" });

    const managerHostel = manager.hostelNo;

    const monthlyBill = await MessBill.find({ month }).populate({path: "user", match: {hostelNo: managerHostel}});
    const filteredBill = monthlyBill.filter(bill => bill.user !== null);
    if (!filteredBill || filteredBill.length === 0) {
      return res.status(404).json({ message: "No bills found" });
    }else{
        res.json({filteredBill, message: `Mess bill of ${month} fetched.`});
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something is wrong in fetching monthly bill" });
  }
};

module.exports = { showBills, addBill, getBill };
