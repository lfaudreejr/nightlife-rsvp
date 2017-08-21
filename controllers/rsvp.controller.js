const Rsvp = require('../models/rsvp.model')

module.exports.findRsvp = async function findRsvp(yelpId, guestId) {
  await Rsvp.find({ yelpId: yelpId, guestId: guestId }, (err, foundRsvp) => {
    if (err) {
      return err
    }
    if (foundRsvp) {
      return foundRsvp
    }
    return {}
  })
}

module.exports.findOneRsvp = async function findOneRsvp(yelpId) {
  const searchObj = { yelpId: yelpId }
  const findOne = await Rsvp.findOne(searchObj)
  return findOne
}
