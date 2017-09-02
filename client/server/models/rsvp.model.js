const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RsvpSchema = new Schema({
  yelpId: { type: String, index: true },
  guest: { type: Array, default: [] }
  // attending: { type: Number, default: 0 }
})

RsvpSchema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});
RsvpSchema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});
RsvpSchema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});


const Rsvp = mongoose.model('Rsvp', RsvpSchema)

module.exports = Rsvp
