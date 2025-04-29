const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: "No answer yet"
    }
})

const Query = mongoose.model("Query", querySchema);
module.exports = Query;