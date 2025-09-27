// get student details
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isCareTaker} = require("../../middlewares/checkRole.js");
const {getAllStudentData, updateStudentDetail } = require("../../controllers/adminController");

router.get("/", isLoggedIn, isCareTaker, getAllStudentData);
router.patch("/:id", isLoggedIn, isCareTaker, updateStudentDetail);

module.exports = router;
