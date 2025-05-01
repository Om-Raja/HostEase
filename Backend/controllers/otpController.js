const Otp = require("../models/otp");
const nodemailer = require("nodemailer");

// Send OTP
const sendOtpController = async (req, res) => {
    try {
    const { email } = req.body;

    const doesAlredyExist = await Otp.findOne({email});
    if(doesAlredyExist){
        return res.status(400).json({message: "OTP is already sent to your email ", email});
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to the database
        await Otp.create({ email, otp });

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Signup",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent successfully. Email may take 2 minutes to recieve on your gndec webmail. Your OTP is valid for 5 minutes." });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error });
    }
};

// Verify OTP
const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if OTP exists and matches
        const otpRecord = await Otp.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Mark email as verified
        otpRecord.verified = true;
        await otpRecord.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to verify OTP", error });
    }
};

module.exports = { sendOtpController, verifyOtpController };