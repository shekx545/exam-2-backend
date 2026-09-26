const { Schema, model } = require("mongoose");

const seat_typeSchema = new Schema(
  {
    name: { type: String, required: true },
  }
);

const Seat_type = model("Seat_type", seat_typeSchema);

module.exports = { Seat_type };