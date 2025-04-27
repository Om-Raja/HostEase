// get student details
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const {getAllStudentData, updateStudentDetail } = require("../../controllers/adminController");

router.get("/", isLoggedIn, isAdmin, getAllStudentData);
router.patch("/:id", isLoggedIn, isAdmin, updateStudentDetail);

module.exports = router;
