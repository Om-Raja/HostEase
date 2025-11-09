const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type: Number,
        required: true,
        min: 1,
    },
    floor:{
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    block:{
        type: String,
        enum: ['A', 'B'],
        required: true,
    },
    hostel:{
        type: Number,
        enum: [1, 2, 4, 5],
        required: true,
    },
    owner:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room