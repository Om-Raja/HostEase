const Leave = require("../models/leave");

const applyForLeave = async (req, res)=>{
    try{
        const {leave} = req.body;
        if(!leave){
            return res.status(400).json({message: "Leave request is missing"});
        }
        const newLeave = new Leave({...leave, user: req.user._id});
        await newLeave.save();
        res.status(201).json({message: "Leave request raised", leave: newLeave});
    }catch(err){
        console.error(`Error in applying for leave: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateLeaveRequest = async (req, res)=>{
    try{
        const id = req.params.id;
        const {leave} = req.body;
        if(!id){
            return res.status(400).json({message: "Leave request ID is required to update the request"});
        }
        if(!leave){
            return res.status(400).json({message: "Leave request is missing"});
        }
        const result = await Leave.findByIdAndUpdate(id, {...leave}, {new: true, runValidators: true});

        if(!result){
            return res.status(404).json({message: "Id is invalid or missing"});
        }
        res.status(200).json({message: "Leave request updated", leave: result});

    }catch(err){
        console.error(`Error in updating leave request with ID ${req.params.id} : ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {applyForLeave, updateLeaveRequest};