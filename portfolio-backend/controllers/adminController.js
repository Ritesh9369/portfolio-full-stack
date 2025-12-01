import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Admin({ email, password: hashedPassword }).save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
