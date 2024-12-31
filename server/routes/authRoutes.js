import express from "express"
const router = express.Router();
import { registerUser, login } from "../controllers/authController.js";

// Route for user signup
router.post("/signup", registerUser);
router.post('/login', login)

export default router;