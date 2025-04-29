const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {validateUserData, validateCareTakerData} = require("../middlewares/validateUserData");
const isAdmin = require("../middlewares/isAdmin");
const { updateStudentDetails, getStudentDetails} = require("../controllers/userController");

router.route("/")
.patch(isLoggedIn, validateUserData, updateStudentDetails)
.get(isLoggedIn, getStudentDetails);
router.patch("/admin", isLoggedIn, isAdmin, validateCareTakerData, updateStudentDetails);

module.exports = router;

