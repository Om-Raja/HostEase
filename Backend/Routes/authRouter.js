const router = require("express").Router();
const { signUpValidation, loginValidation, sendOtpValidation } = require("../middlewares/authValidation");
const { signUpController, loginController } = require("../controllers/authController")
const { sendOtpController, verifyOtpController } = require("../controllers/otpController");

router.post("/send-otp", sendOtpValidation, sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginValidation, loginController);
router.post("/signup", signUpValidation, signUpController);
module.exports = router;