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
    room: String,
    branch: String,
    batch: String,
    mobile: String,
    FatherName: String,
    MotherNmae: String,
    Address: String,
    HostelNo: {
        type: Number,
        enum:[1, 2, 3, 4],
    }
})


const User = mongoose.model("User", userSchema);
module.exports = User;