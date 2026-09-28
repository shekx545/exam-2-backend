const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    event_id: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    seat_id: { type: Schema.Types.ObjectId, ref: "Seat", required: true },
    price: { type: Number, required: true },
    service_fee: { type: Number, required: true },
    status_id: { type: Schema.Types.ObjectId, ref: "Ticket_status", required: true },
    ticket_type_id: { type: Schema.Types.ObjectId, ref: "Tycket_type", required: true },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);

module.exports = { Ticket };