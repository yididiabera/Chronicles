import express from "express";
import multer from "multer";
import {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deleteById,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import protect from "../middleware/protect.js";

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Routes
router.post("/", verifyToken, protect, upload.single("image"), createPost); // Add upload middleware
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, protect, upload.single("image"), updatePostById); // Optional: Allow updating image
router.delete("/:id", verifyToken, protect, deleteById);

export default router;
