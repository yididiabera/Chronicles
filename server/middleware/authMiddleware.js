import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Extract the token from the cookies
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user object (containing user ID) to req.user
    console.log("Decoded Token: ", req.user);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
  }
  // Log cookies and headers for debugging
  //console.log("Cookies:", req.cookies);
  //console.log("Authorization Header:", req.headers.authorization);

  // Get token from cookies or headers
  //const token =
    //req.cookies?.access_token || // Token in cookies
    //req.headers.authorization?.split(" ")[1]; // Token in Authorization header

  //console.log(`Access token: ${token}`);
  
  //console.log("Cookies:", req.cookies);
  //console.log("Authorization Header:", req.headers.authorization);

  //if (!token) {
    //console.error("Access token is missing.");
    //const error = new Error("Unauthorized.");
    //error.status = 401;
    //return next(error);

  // Verify the token
 // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         console.error("Token expired:", err);
//         const error = new Error("Token expired. Please log in again.");
//         error.status = 401;
//         return next(error);
//       } else {
//         console.error("Invalid token:", err);
//         const error = new Error("Invalid token.");
//         error.status = 403;
//         return next(error);
//       }
//     }

//     req.user = user; // Attach user to request
//     next();
//   });
// };
