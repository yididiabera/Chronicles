import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/comments.js"
import cookieParser from "cookie-parser";
import protect from "./middleware/protect.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());  // if we miss this req.cookies will always be undefined
// Adding CORS header
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running..."));

// Authentication routes
app.use("/api/auth", authRoutes);

// Post routes
app.use("/api/posts", postRoutes);

// Comment routes
app.use('/api/comments', commentRoutes);

// Centralized Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("My first Express app - listening on port: " + PORT);
});
