import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Adjust path if needed

const protect = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to req.user
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
