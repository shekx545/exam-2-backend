const { Schema, model } = require("mongoose");

const delivery_methodSchema = new Schema(
    {
        name: { type: String, required: true },
    });

const Delivery_method = model("Delivery_method", delivery_methodSchema);

module.exports = { Delivery_method };