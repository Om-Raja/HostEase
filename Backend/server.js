const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const productRouter = require("./Routes/product");
const complaintRouter = require("./Routes/complaintRoutes");
const queryRouter = require("./Routes/queryRouter");
require("./models/db");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res)=>{
    res.send("POnG");
})

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/auth", authRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/query", queryRouter);


app.listen(PORT, ()=>{
    console.log("Server started at PORT ", PORT);
})