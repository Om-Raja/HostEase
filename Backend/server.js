const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const complaintRouter = require("./Routes/complaintRoutes");
const queryRouter = require("./Routes/queryRouter");
const userRouter = require("./Routes/userRouter");
const studentRouter = require("./Routes/admin-routes/studentDetailRouter");
const globalCatch = require("./middlewares/globalCatch");
require("./models/db");

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/query", queryRouter);
app.use("/api/admin/student", studentRouter);

// Handle undefined routes
app.use((req, res, next)=>{
    return res.status(404).json({message: "Route not found"});
});

// Globar error handler
app.use(globalCatch);


app.listen(PORT, ()=>{
    console.log("Server started at PORT ", PORT);
})