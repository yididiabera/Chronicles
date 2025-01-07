import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Log cookies and headers for debugging
  console.log("Cookies:", req.cookies);
  console.log("Authorization Header:", req.headers.authorization);

  // Get token from cookies or headers
  const token =
    req.cookies?.access_token || // Token in cookies
    req.headers.authorization?.split(" ")[1]; // Token in Authorization header

  console.log(`Access token: ${token}`);

  if (!token) {
    console.error("Access token is missing.");
    const error = new Error("Unauthorized.");
    error.status = 401;
    return next(error);
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token expired:", err);
        const error = new Error("Token expired. Please log in again.");
        error.status = 401;
        return next(error);
      } else {
        console.error("Invalid token:", err);
        const error = new Error("Invalid token.");
        error.status = 403;
        return next(error);
      }
    }

    req.user = user; // Attach user to request
    next();
  });
};
