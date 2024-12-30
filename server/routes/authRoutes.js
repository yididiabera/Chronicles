const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController.js");

// Route for user signup
router.post("/signup", registerUser);

module.exports = router;
