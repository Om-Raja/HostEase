const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isMessManager} = require("../../middlewares/checkRole.js");
const {showBills, addBill} = require("../../controllers/mess/billController.js");

router.get("/", isLoggedIn, isMessManager, showBills);
router.post("/", isLoggedIn, isMessManager, addBill);

module.exports = router;