const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8000;

//Database Configuration
const config = require("./config/database");
mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
});

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

//Passport Configuration for jwt token
require("./config/passport")(passport);

//Routes
require("./app/routes")(app, passport);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
