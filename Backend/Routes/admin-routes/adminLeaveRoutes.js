const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isCareTaker} = require("../../middlewares/checkRole.js");
const { updateLeaveRequestStatus, showAllLeaveRequest } = require("../../controllers/adminLeaveController");

// Update leave request status
router.patch("/:id", isLoggedIn, isCareTaker, updateLeaveRequestStatus);
router.get("/", isLoggedIn, isCareTaker, showAllLeaveRequest);

module.exports = router;

