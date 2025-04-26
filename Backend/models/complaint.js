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
    responseText: String,
    status: {
        type: String,
        enum: ["pending", "resolved", "rejected"],
        default: "pending",
    },
    isSolved:{
        type: String,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;