const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["student", "superAdmin", "careTaker", "messManager"],
        required: true,
        default: "student",
    },
    crn:String,
    urn:String,
    room: {
        type: Number,
        min: 1,
        max: 999
    },
    branch: {
        type: String,
        enum: ["CSE", "ECE", "CE", "IT", "ME", "EE"],
    },
    batch: String,
    mobile: String,
    fatherName: String,
    motherName: String,
    address: String,
    fatherPhoneNo: String,
    hostelNo: {
        type: Number,
        enum:[1, 2, 3, 4, 5]
    },
    messAccount: Number,
})


const User = mongoose.model("User", userSchema);
module.exports = User;