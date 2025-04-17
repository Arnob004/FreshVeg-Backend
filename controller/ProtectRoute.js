import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "token");

    req.user = await User.findById(decoded.userid);
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("ProtectRoute Error:", err);
    res.status(401).json({ message: "Not authorized" });
  }
};
