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
        console.error("Error fetching complaints: ", err);
        res.status(500).json({message: "Internal server error"});
    }
}

const complaintSolved = async (req, res) => {
    try{
        const {_id} = req.body.complaint;
        if(!_id){
            return res.status(400).json({message: "Complaint ID (_id) is required to mark it as solved."});
        }

        const theComplaint = await ComplaintModel.findByIdAndUpdate(_id, {isSolved: true}, {new: true});

        if(!theComplaint){
            return res.status(404).json({ message: "Complaint not found"});
        }

        return res.status(200).json({ message: "Complaint is marked as SOLVED!", complaint: theComplaint });

    }catch(err){
        console.error("Error in updating the solved status of complaint. Error: ", err );
        return res.status(500).json({message: "Internal server error"});
    }
}



module.exports = {registerComplaint, showMyComplaint, complaintSolved};