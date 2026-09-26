const { Schema, model } = require("mongoose");

const venue_typesSchema = new Schema(
  {
    venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    typeId: { type: Schema.Types.ObjectId, ref: "Types", required: true },
  }
);

const Venue_types = model("Venue_types", venue_typesSchema);

module.exports = { Venue_types };