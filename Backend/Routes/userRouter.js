const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const validateUserData = require("../middlewares/validateUserData");
const { updateStudentDetails, getStudentDetails} = require("../controllers/userController");

router.route("/")
.patch(isLoggedIn, validateUserData, updateStudentDetails)
.get(isLoggedIn, getStudentDetails);

module.exports = router;

