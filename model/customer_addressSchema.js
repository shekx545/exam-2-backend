const { Schema, model } = require("mongoose");

const customer_addressSchema = new Schema(
  {
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    name: { type: String, required: true },
    region_id: { type: Schema.Types.ObjectId, ref: "Region", required: true },
    district_id: { type: Schema.Types.ObjectId, ref: "District", required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    flat_id: { type: Schema.Types.ObjectId, ref: "Flat", required: true },
    location: { type: String },
    post_index: { type: String },
    info: { type: String },
  },
  { timestamps: true }
);

const Customer_address = model("Customer_address", customer_addressSchema);

module.exports = { Customer_address };