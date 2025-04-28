const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const { updateLeaveRequestStatus, showAllLeaveRequest } = require("../../controllers/adminLeaveController");

// Update leave request status
router.patch("/:id", isLoggedIn, isAdmin, updateLeaveRequestStatus);
router.get("/", isLoggedIn, isAdmin, showAllLeaveRequest);

module.exports = router;

