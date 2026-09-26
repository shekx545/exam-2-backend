const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        customer_id: {type: Schema.Types.ObjectId, ref: "Customer"},
        createdAt: {type: Date,default: Date.now},
        fineshedAt: {type: Date, default: null},
        status_id: { type: Schema.Types.ObjectId, ref: "Status" },
    },
    { timestamps: true }
);

const Cart = model("Cart", cartSchema);

module.exports = { Cart };