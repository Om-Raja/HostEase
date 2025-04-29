const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { registerComplaint, showMyComplaint, complaintSolved, deleteComplaint } = require("../controllers/complaintController");
const complaintValidation = require("../middlewares/complaintValidation");

router.route("/")
.post(isLoggedIn, complaintValidation, registerComplaint)
.get(isLoggedIn, showMyComplaint)


router.route("/:id")
.patch(isLoggedIn, complaintSolved)
.delete(isLoggedIn, deleteComplaint);

module.exports = router;