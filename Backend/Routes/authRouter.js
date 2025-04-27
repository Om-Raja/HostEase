const router = require("express").Router();
const { signUpValidation, loginValidation, sendOtpValidation } = require("../middlewares/authValidation");
const { signUpController, loginController, logOutController } = require("../controllers/authController")
const { sendOtpController, verifyOtpController } = require("../controllers/otpController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/send-otp", sendOtpValidation, sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginValidation, loginController);
router.post("/signup", signUpValidation, signUpController);
router.post("/logout", isLoggedIn, logOutController);
module.exports = router;