const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // Debugging line

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isPasswordValid); // Debugging line

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful ✅", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { register, login };
