const ComplaintModel = require("../models/complaint");

const registerComplaint = async (req, res) => {
    try {
        const complaintData = req.body.complaint;
        if (!complaintData) {
            return res.status(400).json({ message: "No complaint data received." });
        }

        const newComplaint = new ComplaintModel({
            ...complaintData,
            user: req.user._id,
        });
        await newComplaint.save();

        res.status(201).json({ message: "Complaint registered successfully." });
    } catch (error) {
        console.error("Error registering complaint:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const showMyComplaint = async (req, res) =>{
    try{
        const allComplaints = await ComplaintModel.find({user: req.user._id });
        if(!allComplaints || allComplaints.length === 0){
            return res.status(404).json({message:"There are no complaints registered by you"});
        }
        res.status(200).json({ allComplaints });
    }catch(err){
        console.error("Error fetching complaints: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}



module.exports = {registerComplaint, showMyComplaint};