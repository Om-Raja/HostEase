const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    careTaker: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
        minlength: 10,
    },
    hostelNo:{
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    }, 
    createdAt:{
        type: Date,
        default: Date.now,
    },
    expiresAt:{
        type: Date,
        required: true,
        expires: 12*60*60, //12 hour
    }
});

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;