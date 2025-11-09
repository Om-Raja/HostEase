const mongoose = require("mongoose");
const roomRequestSchema = new mongoose.Schema({
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    requester:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cgpa:{
        type:Number,
        required: true,
        max: 10,
        min: 0,
        default: 0
    }
}, {timestamps: true})

const Request = mongoose.model("Request", roomRequestSchema);
module.exports = Request;