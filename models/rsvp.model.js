const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RsvpSchema = new Schema({
  yelpId: { type: String },
  guestId: { type: Array },
  attending: { type: Number, default: 0 }
})

const Rsvp = mongoose.model('Rsvp', RsvpSchema)

module.exports = Rsvp
