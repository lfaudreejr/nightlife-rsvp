const yelp = require('yelp-fusion')

const rsvpController = require('./rsvp.controller')

async function removeRsvp(rsvp) {
  const guestCheck = await rsvp.guest.map(guest => {
    // if (guest.date + 5000 < Date.now()) {
    //   console.log('OUTDATED: ', guest)
    //   // rsvp.update({}, { $pull: { guest: { id: guest.id } } })
    //   // rsvp.remove(guest)
    //   rsvp.guest.pull(guest)
    //   rsvp.save()
    // }
    rsvp.guest.remove(guest)
    rsvp.save()
  })
  return rsvp
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
  return clientSearch.jsonBody.businesses.slice(0, 10)
}

async function getAttendees(bars) {
  const newBarArray = []

  for (let i = 0; i < bars.length; i++) {
    const newBarObj = bars[i]
    newBarObj.attending = []
    const barRsvp = await rsvpController.findOneRsvp(newBarObj.id)
    if (barRsvp) {
      if (barRsvp.guest.length > 0) {
        for (let j = 0; j < barRsvp.guest.length; j++) {
          const date = new Date()
          const today = date.getDay()
          if (
            // barRsvp.guest[j].date + 3600000 < Date.now() &&
            barRsvp.guest[j].date !== today &&
            barRsvp.guest[j].date
          ) {
            await removeRsvp(barRsvp)
            // console.log("removed", barRsvp.guest[j])
            newBarArray.push(newBarObj)
          } else {
            // console.log("sending", barRsvp.guest[j])
            newBarObj.attending.push(barRsvp.guest[j])
            newBarArray.push(newBarObj)
          }
        }
      } else {
        // console.log("nothing", newBarObj)
        newBarArray.push(newBarObj)
      }
    } else {
      // console.log("nothing", newBarObj)
      newBarArray.push(newBarObj)
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
