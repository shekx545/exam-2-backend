const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String },
    site: { type: String },
    phone: { type: String, required: true },
    schema: { type: String },
    region_id: { type: Schema.Types.ObjectId, ref: "Region", required: true },
    district_id: { type: Schema.Types.ObjectId, ref: "District", required: true },
  },
  { timestamps: true }
);

const Venue = model("Venue", venueSchema);

module.exports = { Venue };