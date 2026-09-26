const { Schema, model } = require("mongoose");

const venue_photoSchema = new Schema(
  {
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    url: { type: String, required: true },
  }
);

const Venue_photo = model("Venue_photo", venue_photoSchema);

module.exports = { Venue_photo };