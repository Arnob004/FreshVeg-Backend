import express from "express";
import cookieParser from "cookie-parser";
import upload from "../middleware/upload.js";
import {
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "../controller/ResetPassword.js";
import { AllProduct } from "../controller/AllProduct.js";
import { Logout } from "../controller/Logout.js";
import { SignUp } from "../controller/SignUp.js";
import { Login } from "../controller/Login.js";
import { ProtectRoute } from "../controller/ProtectRoute.js";
export const route = express.Router();
route.use(cookieParser());
// 🔐 Auth
route.post("/signup", upload.single("photo"), SignUp);
route.post("/login", Login);
route.post("/logout", Logout);
// 👤 User
route.get("/user/me", ProtectRoute, async (req, res) => {
  const { password, ...userData } = req.user._doc;
  res.status(200).json({ user: userData });
});
// 📦 Product
route.get("/product", AllProduct);
// 🔁 Password Reset
route.post("/forgot-password", forgotPassword);
route.post("/verify-otp", verifyOtp);
route.post("/reset-password", resetPassword);
