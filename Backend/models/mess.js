const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    messAccount: Number,
    currentBill:{
        type: Number,
        default: 0
    },
    noOfDaysClosed:{
        type: Number,
        default: 0,
    },
    closedFrom: Date,
    onSemesterTraining: {
        type: Boolean,
        default: false,
    },
    month: String,
    year: Number,
});

const MessBill = mongoose.model("MessBill", messSchema);
module.exports = MessBill;