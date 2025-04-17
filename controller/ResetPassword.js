import { User } from "../models/User.models.js";
import { sendOTP } from "../Utils/mailer.js";
import bcrypt from "bcrypt"; // Don't forget to import bcrypt

// ✅ 4-digit OTP generator
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otp = otp;
    console.log("sent otp from code " + otp);

    user.otpExpires = otpExpires;
    await user.save();
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("👉 Received OTP in backend:", otp); // Debug log here
  try {
    const user = await User.findOne({ email });
    console.log("👉 Stored OTP:", user?.otp);

    if (!user || user.otp !== otp.toString() || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Password reset failed", error: err.message });
  }
};
