const ComplaintModel = require("../../models/complaint");

const updateComplaint = async (req, res)=>{
    try{
        const complaintId = req.params.id;
        if(!complaintId){
            return res.status(400).json({message: "Complaint id is required to update complaint"});
        }
        const {responseText, status} = req.body;
        const result = await ComplaintModel.findByIdAndUpdate(complaintId, {responseText: responseText, status: status}, {new: true, runValidators: true});
        if(!result){
            return res.status(400).json({message: "Invalid complaint ID"});
        }

        res.status(200).json({message: "Complaint status updated"});        
    }catch(err){
        console.error(`Error in updating complaint ${req.params.id}. Error: ${err}`);
        res.status(500).json({message: "Something went wrong while updating complaint"});
    }
}

module.exports = {updateComplaint}