//const express = require("express");
//const app = express();
//console.log("My Name is Rohit");

const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const morgan = require("morgan");
const registrationRoutes = require("./Controllers/registrationController");


require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Routes
app.use("/api/registration", registrationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgMagenta.white);
});
