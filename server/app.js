const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

//connect to the database
connectDB();

const app = express();

// Routes
app.get("/", (req, res) => res.send("API is running..."));

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("My first Express app - listening on port: " + PORT);
});
