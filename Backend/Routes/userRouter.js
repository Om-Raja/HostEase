const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {validateUserData, validateCareTakerData} = require("../middlewares/validateUserData");
const isAdmin = require("../middlewares/isAdmin");
const { updateStudentDetails, getStudentDetails, assignUserRole } = require("../controllers/userController");
const isSuperAdmin = require("../middlewares/isSuperAdmin");

router.route("/")
.patch(isLoggedIn, validateUserData, updateStudentDetails)
.get(isLoggedIn, getStudentDetails);

// SuperAdmin: Assign role to any user
router.patch("/assign-role", isLoggedIn, isSuperAdmin, assignUserRole);

router.patch("/admin", isLoggedIn, validateCareTakerData, updateStudentDetails);

module.exports = router;

