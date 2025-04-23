const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
require("./models/db");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res)=>{
    res.send("POnG");
})

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);


app.listen(PORT, ()=>{
    console.log("Server started at PORT ", PORT);
})