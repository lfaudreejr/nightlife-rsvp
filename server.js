const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const cookieSession = require("cookie-session");
const RateLimit = require("express-rate-limit");
const responseTime = require("response-time");
const compression = require("compression");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("express-jwt");
const server = express();
require("dotenv").config();

const authCheck = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, "base64"),
  audience: process.env.AUTH0_CLIENT_ID
});

const yelpRoutes = require("./routes/yelp");
const auth = require("./controllers/auth.controller");
const config = require("./config");

// MongoDB - Mongoose
mongoose.connect(config.MONGO_URI);
const MongoDB = mongoose.connection;
MongoDB.on("error", () => {
  console.error(
    "MongoDB connection error. Please make sure that",
    config.MONGO_URI,
    "is running."
  );
});
MongoDB.on("open", () => {
  console.info("Connected to Mongodb:", config.MONGO_URI);
});
// Middleware
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});
server.use(morgan("combined"));
server.use(cors());
server.use(helmet());
server.use(limiter);
server.use(
  cookieSession({
    name: "session",
    keys: [process.env.KEY, process.env.KEY2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
server.use(cookieParser());
server.use(csrf({ cookie: true }));
server.use(compression());
server.use(responseTime());
server.use(passport.initialize());
server.use(passport.session());
// Set static path to Angular app in dist
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  server.use("/", express.static(path.join(__dirname, "./client/dist")));
}
// Routes
server.use("/yelp", yelpRoutes);
server.get("/user", authCheck, auth.getUser);
server.get("/logout", auth.logout);
// Pass routing to Angular
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  server.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });
}
// 404 Handler
server.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// Set Port
const port = process.env.PORT || 3000;
server.listen(port, err => {
  if (err) throw err;
  console.log(`Listening on ${port}`);
});
