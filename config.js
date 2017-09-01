module.exports = {
  MONGO_URI: process.env.MONGO_URI, //|| 'mongodb://localhost:27017/nightlife',
  AUDIENCE: process.env.AUTH0_AUDIENCE,
  DOMAIN: process.env.AUTH0_DOMAIN,
  isProd: process.env.NODE_ENV === 'production'
};
