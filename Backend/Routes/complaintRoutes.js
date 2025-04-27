const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { registerComplaint, showMyComplaint, complaintSolved } = require("../controllers/complaintController");
const complaintValidation = require("../middlewares/complaintValidation");

router.post("/", isLoggedIn, complaintValidation, registerComplaint);
router.get("/", isLoggedIn, showMyComplaint);
router.patch("/", isLoggedIn, complaintSolved);

module.exports = router;