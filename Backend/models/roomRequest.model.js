const mongoose = require("mongoose");
const roomRequestSchema = new mongoose.Schema({
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    }],
    requester:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cgpa:{
        type:Number,
        required: true,
        max: 10,
        min: 0,
        default: 0,
    },
    hostelNo:{
        type: Number,
        enum:[1, 2, 4, 5],
        required: true
    }
}, {timestamps: true})

const Request = mongoose.model("Request", roomRequestSchema);
module.exports = Request;