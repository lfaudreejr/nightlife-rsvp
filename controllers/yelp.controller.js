const yelp = require('yelp-fusion')

module.exports = async function findBars(location) {
  const yelpToken = await getYelpToken()
  const search = await searchYelp(yelpToken, location)
  return search
}

async function getYelpToken() {
  const clientId = process.env.YELP_ID
  const clientSecret = process.env.YELP_SECRET
  const yelpResponse = await yelp.accessToken(clientId, clientSecret)
  return yelpResponse.jsonBody.access_token
}

async function searchYelp(token, location) {
  const client = await yelp.client(token)
  const searchRequest = {
    term: 'bars',
    location: location
  }
  const clientSearch = await client.search(searchRequest)
  return clientSearch.jsonBody.businesses.slice(0, 20)
}
