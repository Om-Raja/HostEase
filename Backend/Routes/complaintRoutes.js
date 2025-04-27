const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { registerComplaint, showMyComplaint, complaintSolved } = require("../controllers/complaintController");
const complaintValidation = require("../middlewares/complaintValidation");

router.route("/")
.post(isLoggedIn, complaintValidation, registerComplaint)
.get(isLoggedIn, showMyComplaint);

router.patch("/:id", isLoggedIn, complaintSolved);

module.exports = router;