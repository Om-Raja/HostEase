const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { registerComplaint, showMyComplaint } = require("../controllers/complaintController");
const complaintValidation = require("../middlewares/complaintValidation");

router.post("/register", isLoggedIn, complaintValidation, registerComplaint);
router.get("/seeComplaints", isLoggedIn, showMyComplaint);

module.exports = router;