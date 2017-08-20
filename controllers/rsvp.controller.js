const Rsvp = require('../models/rsvp.model')

module.exports = async function findRsvp(yelpId, guestId) {
  Rsvp.find({ yelpId: yelpId, guestId: guestId }, (err, foundRsvp) => {
    if (err) return err
    if (foundRsvp) return foundRsvp
    return {}
  })
}
