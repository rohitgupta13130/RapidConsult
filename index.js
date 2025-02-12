//const express = require("express");
//const app = express();
//console.log("My Name is Rohit");

const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // No need for bodyParser.json()
app.use(morgan("dev"));

const registrationRoutes = require("./Controllers/registrationController");

// Routes
app.use("/api/registration", registrationRoutes);

// Port Configuration
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.bgMagenta.white);
});
