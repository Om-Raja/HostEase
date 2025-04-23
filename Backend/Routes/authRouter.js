const router = require("express").Router();
const {signUpValidation, loginValidation} = require("../middlewares/authValidation");
const {signUpController, loginController} = require("../controllers/authController")

router.post("/login", loginValidation, loginController);
router.post("/signup", signUpValidation, signUpController);
module.exports = router;