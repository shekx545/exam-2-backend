const { Schema, model } = require("mongoose");

const tycket_typeSchema = new Schema(
  {
    ticket_type: { type: String, required: true },
  }
);

const Tycket_type = model("Tycket_type", tycket_typeSchema);

module.exports = { Tycket_type };