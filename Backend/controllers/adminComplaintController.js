const ComplaintModel = require("../models/complaint");
const User = require("../models/user");
const nodemailer = require("nodemailer");

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
        
        const theComplaint = await ComplaintModel.findById(complaintId).populate("user", "name email");
        if(!theComplaint) return res.status(404).json({message: "Complaint not found"});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: theComplaint.user.email,
            subject: "Response to your complaint",
            html: `Hi, <b> ${theComplaint.user.name}!</b> CareTaker has responded to your registered complaint.<br/>
            Complaint: ${theComplaint.complaintText} </br>
            Response: ${theComplaint.responseText}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: "Complaint status updated"});        
    }catch(err){
        console.error(`Error in updating complaint ${req.params.id}. Error: ${err}`);
        res.status(500).json({message: "Something went wrong while updating complaint"});
    }
}

const getAllComplaints = async (req, res) => {
    try{
        const careTakerEmail = req.user.email;
        if(!careTakerEmail) return res.status(400).json({message: "CareTaker email is missing"});

        const careTaker = await User.findOne({email: careTakerEmail});
        if(!careTaker) return res.status(404).json({message: "No careTaker found"});

        const careTakerHostel = careTaker.hostelNo;

        const allStudentOfSameHostel = await User.find({hostelNo: careTakerHostel}).select("_id");
        if(!allStudentOfSameHostel || allStudentOfSameHostel.length === 0) return res.status(404).json({message: `There are no student in hostel no ${careTakerHostel}`});

        const allUserIds = allStudentOfSameHostel.map((u)=>{return u._id});

        const allComplaints = await ComplaintModel.find({user: {$in: allUserIds}}).populate("user", "name email branch crn room hostelNo mobile");
        if(!allComplaints || allComplaints.length === 0){
            return res.status(404).json({message: "No complaints found"});
        }
        res.status(200).json({allComplaints});

    }catch(err){
        console.error(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {updateComplaint, getAllComplaints};