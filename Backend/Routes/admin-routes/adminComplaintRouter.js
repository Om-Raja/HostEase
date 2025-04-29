const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {updateComplaint, getAllComplaints} = require("../../controllers/adminComplaintController");


router.patch("/:id", isLoggedIn, isAdmin, updateComplaint);
router.get("/", isLoggedIn, isAdmin, getAllComplaints);

module.exports = router;