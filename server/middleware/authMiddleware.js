import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies); // Log the cookies to check if access_token is present

  const token = req.cookies.access_token;

  if (!token) {
    console.error("Access token is missing.");
    const error = new Error("Unauthorized.");
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
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
    req.user = user;
    next();
  });
};