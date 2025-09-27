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
const adminComplaintRouter = require("./Routes/admin-routes/adminComplaintRouter");
const adminQueryRouter = require("./Routes/admin-routes/adminQueryRouter");
const leaveRouter = require("./Routes/leaveRoutes");
const adminNoticeRouter = require("./Routes/admin-routes/adminNoticeRoute");
const studentNoticeRouter = require("./Routes/noticeRoute");
const adminLeaveRouter = require("./Routes/admin-routes/adminLeaveRoutes");
const superAdminRouter = require("./Routes/super-admin/superAdminRoute");
const messRoutes = require("./Routes/mess-routes/messRoutes.js")
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
app.use("/api/admin/complaint", adminComplaintRouter );
app.use("/api/admin/query", adminQueryRouter );
app.use("/api/leave", leaveRouter);
app.use("/api/admin/leave", adminLeaveRouter);
app.use("/api/admin/notice", adminNoticeRouter);
app.use("/api/student/notice", studentNoticeRouter);
// app.use("/api/superAdmin", superAdminRouter);
app.use("/api/mess", messRoutes);

// Handle undefined routes
app.use((req, res, next)=>{
    return res.status(404).json({message: "Route not found"});
});

// Globar error handler
app.use(globalCatch);


app.listen(PORT, ()=>{
    console.log("Server started at PORT ", PORT);
})