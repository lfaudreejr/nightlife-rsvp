const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const config = require('./../config')

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: config.AUDIENCE,
  issuer: `https://${config.DOMAIN}/`,
  algorithms: ['RS256']
})

module.exports = checkJwt
