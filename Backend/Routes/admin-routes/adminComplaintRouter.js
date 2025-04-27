const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {updateComplaint} = require("../../controllers/adminComplaintController");


router.patch("/:id", isLoggedIn, isAdmin, updateComplaint);

module.exports = router;