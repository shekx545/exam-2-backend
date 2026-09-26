const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },
    createdAt: { type: Date, default: Date.now },
    fineshed: { type: Date, default: null },
    payment_method_id: { type: Schema.Types.ObjectId, ref: "Payment_method" },
    delivery_method_id: { type: Schema.Types.ObjectId, ref: "Delivery_method" },
    discount_id: { type: Schema.Types.ObjectId, ref: "Discount" },
    status_id: { type: Schema.Types.ObjectId, ref: "Status" },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

module.exports = { Booking };