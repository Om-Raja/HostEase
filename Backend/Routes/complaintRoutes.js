const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { registerComplaint, showMyComplaint } = require("../controllers/complaintController");
router.post("/register", isLoggedIn, registerComplaint);
router.get("/seeComplaints", isLoggedIn, showMyComplaint);

module.exports = router;