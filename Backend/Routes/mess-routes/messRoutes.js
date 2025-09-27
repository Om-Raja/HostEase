const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {isMessManager} = require("../../middlewares/checkRole.js");
const {showBills, addBill, getBill} = require("../../controllers/mess/billController.js");

router.get("/", isLoggedIn, isMessManager, showBills);
router.get("/monthlyBill", isLoggedIn, isMessManager, getBill);
router.post("/:id", isLoggedIn, isMessManager, addBill);

module.exports = router;