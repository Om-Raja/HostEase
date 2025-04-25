const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Otp = require("../models/otp"); // Corrected the import to match the usage

const signUpController = async function (req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Check if email is verified
    const otpRecord = await Otp.findOne({ email }); // Updated to use the corrected import
    if (!otpRecord || !otpRecord.verified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new userModel({
      name,
      email,
      password,
      role,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    // Delete the OTP record after successful signup
    await Otp.deleteOne({ email }); // Updated to use the corrected import

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const loginController = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorised! Email or password is incorrect!" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email: user.email, role: user.role, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
        );

        return res.status(200).json({
          message: "Login successful",
          success: true,
          token,
          email,
          name: user.name,
          role: user.role, // Include role in the response
        });
      }
      res.status(401).json({
        err,
        message: "Unauthorised! Email or password is incorrect!",
      });
    });
  } catch (error) {
    res.status(500).json({ error, message: "something went wrong!" });
  }
};

const logOutController = function (req, res) {
  //logout
};

module.exports = { signUpController, loginController };
