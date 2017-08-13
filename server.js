const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const cookieSession = require("cookie-session");
const RateLimit = require("express-rate-limit");
const responseTime = require("response-time");
const compression = require("compression");
const cors = require("cors");
const server = express();

const port = process.env.PORT || 3000;
const csrfProtection = csrf({ cookie: true });
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  delayMs: 0
});
// Middleware
server.use(morgan("combined"));
server.use(cors());
server.use(helmet());
server.use(limiter);
server.use(
  cookieSession({
    name: "session",
    keys: [process.env.KEY, process.env.KEY2],
    maxAge: 24 * 60 * 60 * 1000
  })
);
server.use(cookieParser());
server.use(compression());
server.use(responseTime());
server.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

server.get("/", csrfProtection, (req, res) => {
  res.send("Hello server");
});

// Pass routing to Angular
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  server.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });
}

server.listen(port, err => {
  if (err) throw err;
  console.log(`Listening on ${port}`);
});
