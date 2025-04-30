const User = require("../models/user");
const Notice = require("../models/notice");

const getAllNotices = async (req, res)=>{
    try{
        const student = await User.findById(req.user._id);
        if(!student) return res.status(404).json({message: "User not found"});
    
        const allNotices = await Notice.find({hostelNo: student.hostelNo}).populate("careTaker", "name mobile email");
        if(!allNotices || allNotices.length === 0){
            return res.status(404).json({message: `There are no active notices for hostel no ${student.hostelNo}`});
        }
    
        res.status(200).json(allNotices);
    }catch(err){
        console.error(`Error in finding notice for student. Error: ${err}`);
        res.status(500).json({message: "Some error is encountered, please try again later"});
    }
};

module.exports = {getAllNotices};