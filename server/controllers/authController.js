import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js"; // Import the errorHandler function

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Respond with user data (excluding the password)
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return next(errorHandler(400, 'Email and password are required.'));
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return next(errorHandler(404, 'User not found.'));
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return next(errorHandler(401, 'Invalid email or password.'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token expiration
    );

    console.log("Set-Cookie Header:", token)
    // Exclude sensitive fields from the response
    const { password: _, ...userDetails } = user._doc;

    // Send response with cookie and user data
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookie for production
        sameSite: 'None', // Prevent CSRF attacks
      })
      .json({
        message: 'Login successful.',
        user: userDetails,
      });
  } catch (error) {
    next(error);
  }
};

export { registerUser };
