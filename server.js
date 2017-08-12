const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const responseTime = require("response-time");
const compression = require("compression");
const cors = require("cors");
const server = express();

const port = process.env.PORT || 3000;

// Middleware
server.use(helmet());
server.use(morgan("combined"));
server.use(cors());
server.use(compression());
server.use(responseTime());
server.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

server.get("/", (req, res) => {
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
