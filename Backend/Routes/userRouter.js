const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const {validateUserData, validateCareTakerData} = require("../middlewares/validateUserData");
const { updateStudentDetails, getStudentDetails } = require("../controllers/userController");
const getBill = require("../controllers/mess/userBillController.js");

router.route("/")
.patch(isLoggedIn, validateUserData, updateStudentDetails)
.get(isLoggedIn, getStudentDetails);

router.get("/getBill", isLoggedIn, getBill);

router.patch("/admin", isLoggedIn, validateCareTakerData, updateStudentDetails);

module.exports = router;

