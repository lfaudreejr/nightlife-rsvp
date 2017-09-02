const Rsvp = require('../models/rsvp.model')

module.exports.findOneRsvp = async function findOneRsvp(yelpId) {
  const searchObj = { yelpId: yelpId }
  const findOne = await Rsvp.findOne(searchObj)
  if (findOne) {
    return findOne
  } else {
    return null
  }
}
