const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const RateLimit = require('express-rate-limit');
const responseTime = require('response-time');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const server = express();
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
require('dotenv').config()
const config = require('./server/config');

const yelpRoutes = require('./server/routes/yelp');
const apiRoutes = require('./server/routes/api');

// MongoDB - Mongoose
mongoose.connect(config.MONGO_URI);
const MongoDB = mongoose.connection;
MongoDB.on('error', () => {
  console.error(
    'MongoDB connection error. Please make sure that',
    config.MONGO_URI,
    'is running.'
  );
  process.exit()
});
MongoDB.on('open', () => {
  console.info('Connected to Mongodb:', config.MONGO_URI);
});
// Middleware
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});
server.use(morgan('combined'));
if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  server.use(cors())
}
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
server.use(helmet());
server.use(limiter);
server.use(
  cookieSession({
    name: 'session',
    keys: [process.env.KEY, process.env.KEY2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
server.use(cookieParser());
server.use(compression());
server.use(responseTime());
// server.use(passport.initialize());
// server.use(passport.session());
// Set static path to Angular app in dist
// Dont run in dev
if (process.env.NODE_ENV !== 'dev') {
  server.use('/', express.static(path.join(__dirname, './dist')));
}
// Routes
server.use('/yelp', yelpRoutes);
server.use('/api', apiRoutes);
// Pass routing to Angular
// Dont run in dev
if (process.env.NODE_ENV !== 'dev') {
  server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}
// 404 Handler
server.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
// Set Port
const port = process.env.PORT || 3000;
server.set("port", port);
server.listen(port, err => {
  if (err) throw err;
  console.log(
    `Listening on ${port} ${config.isProd ? '(production)' : '(development)'}`
  );
});
