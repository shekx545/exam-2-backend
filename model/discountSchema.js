const { Schema, model } = require("mongoose");

const discountSchema = new Schema(
    {
        discount: { type: String, required: true },
        finish_date: { type: Date }
    }
    
);

const Discount = model("Discount", discountSchema);

module.exports = { Discount };