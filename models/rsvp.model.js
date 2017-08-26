const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RsvpSchema = new Schema({
  yelpId: { type: String },
  guest: { type: Array, default: [] }
  // attending: { type: Number, default: 0 }
})

// RsvpSchema.pre('remove', next => {
//   Rsvp.update(
//     { guest: this },
//     { $pull: { guest: { id: this.id } } },
//     { multi: true }
//   ).exec(next)
// })

const Rsvp = mongoose.model('Rsvp', RsvpSchema)

module.exports = Rsvp
