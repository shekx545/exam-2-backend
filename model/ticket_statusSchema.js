const { Schema, model } = require("mongoose");

const ticket_statusSchema = new Schema(
  {
    name: { type: String, required: true },
  }
);

const Ticket_status = model("Ticket_status", ticket_statusSchema);

module.exports = { Ticket_status };