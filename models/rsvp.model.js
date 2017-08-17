const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RsvpSchema = new Schema({
  yelpId: { type: String },
  guestId: [{ type: String }]
});

const Rsvp = mongoose.model("Rsvp", RsvpSchema);

module.exports = Rsvp;
