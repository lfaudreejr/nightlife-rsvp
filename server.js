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
const server = express();
require("dotenv").config();

const yelpRoutes = require("./routes/yelp");
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/login");
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
  max: 20,
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
// Routes
server.get("/", (req, res) => {
  res.send("Hello server");
});
server.use("/yelp", yelpRoutes);
server.use("/auth", authRoutes);
server.use("/login", loginRoutes);
// 404 Handler
server.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// Pass routing to Angular
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  server.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });
}
// Set Port
const port = process.env.PORT || 3000;
server.listen(port, err => {
  if (err) throw err;
  console.log(`Listening on ${port}`);
});
