const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const { updateLeaveRequestStatus } = require("../../controllers/adminLeaveController");

// Update leave request status
router.patch("/:id", isLoggedIn, isAdmin, updateLeaveRequestStatus);

module.exports = router;

