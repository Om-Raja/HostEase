const MessBill = require("../../models/mess.js");
const Student = require("../../models/user.js");

const showBills = async (req, res) => {
try{
    const students = await Student.find({hostelNo: req.user.hostelNo});
  
    if (students) res.json({ students, message: "Bills fetched" });
    else res.json({message: "No bill found"});
}catch(err){
    console.log("Error in fetching bill");
    console.error("Error: ", err);

    res.status(500).json({message : "There was some problem in getting bills"});
}
};

const addBill = async(req, res) => {
    try{
        const bill = req.body; //account, user:_id, name, bill
        if(!bill) return res.status(400).json({message: "Month, year or Bill cannot be empty."});

        const newBill = new MessBill({...bill});
        await newBill.save();

        res.status(201).json({message: "Bill added"});

    }catch(err){
        console.log("Error in adding bill controller");
        console.error("Error is : ", err);

        res.status(500).json({message: "There was an error in adding the bill. Try again"});
    }
}

module.exports = {showBills, addBill}