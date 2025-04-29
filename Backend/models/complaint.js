const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    complaintText: {
        type: String,
        required: true,
    },
    responseText:{
        type: String,
        default:"No response yet"
    },
    status: {
        type: String,
        enum: ["pending", "resolved", "rejected"],
        default: "pending",
    },
    isSolved:{
        type: String,
        enum:["Satisfied", "Not Satisfied"],
        default: "Not Satisfied",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;