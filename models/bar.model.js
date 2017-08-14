const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarSchema = new Schema({
  yelpID: String,
  guests: [{ type: Schema.ObjectId, ref: "User" }]
});

const Bar = mongoose.model("Bar", BarSchema);

module.exports = Bar;
