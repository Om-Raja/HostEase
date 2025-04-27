const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reason: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.from; // Ensure 'to' date is not earlier than 'from' date
            },
            message: "'To' date must be greater than or equal to 'From' date.",
        },
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Approved", "Rejected"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;