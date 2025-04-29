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
        enum: ["student", "admin"],
        required: true,
        default: "student",
    },
    crn:{
        type: String,
        unique: true,
        match: [/^\d{7}$/, "Roll number must be exactly 7 digits (numbers only)"]
    },
    urn:{
        type: String,
        unique: true,
        match: [/^\d{7}$/, "Roll number must be exactly 7 digits (numbers only)"]
    },
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
        enum:[1, 2, 3, 4, 5],
    }
})


const User = mongoose.model("User", userSchema);
module.exports = User;