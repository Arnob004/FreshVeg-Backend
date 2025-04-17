import { User } from "../models/User.models.js";
import bcrypt from "bcrypt";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔐 Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔒 Step 2: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📷 Step 3: Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo: req.file?.filename || "", // optional photo
    });
    // 💾 Step 4: Save to DB
    await newUser.save();
    // ✅ Step 5: Send success response
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("Signup error:", err);

    // 🎯 Handle duplicate key error (Mongo error code 11000)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};
