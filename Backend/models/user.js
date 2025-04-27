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
    crn: String,
    urn: String,
    room: Number,
    branch: String,
    batch: String,
    mobile: String,
    fatherName: String,
    motherName: String,
    address: String,
    fatherPhoneNo: String,
    hostelNo: {
        type: Number,
        enum:[1, 2, 3, 4],
    }
})


const User = mongoose.model("User", userSchema);
module.exports = User;