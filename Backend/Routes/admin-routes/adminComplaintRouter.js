const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isCareTaker} = require("../../middlewares/checkRole.js");
const {updateComplaint, getAllComplaints} = require("../../controllers/adminComplaintController");


router.patch("/:id", isLoggedIn, isCareTaker, updateComplaint);
router.get("/", isLoggedIn, isCareTaker, getAllComplaints);

module.exports = router;