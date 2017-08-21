const yelp = require('yelp-fusion')

const rsvpController = require('./rsvp.controller')

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

async function getAttendees(bars) {
  let newBarArray = []
  for (let bar of bars) {
    let newBarObj = bar
    let barRsvp = await rsvpController.findOneRsvp(bar.id)
    if (barRsvp) {
      newBarObj.attending = barRsvp.guestId
      newBarArray.push(newBarObj)
    } else {
      newBarObj.attending = 0
      newBarArray.push(bar)
    }
  }
  return newBarArray
}

module.exports.findBars = async function findBars(location) {
  const yelpToken = await getYelpToken()
  const search = await searchYelp(yelpToken, location)
  const withAttendees = await getAttendees(search)
  // console.log(withAttendees)
  return withAttendees
}
