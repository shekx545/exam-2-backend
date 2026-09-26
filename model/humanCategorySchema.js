const { Schema, model } = require("mongoose");

const humanCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    start_age: { type: Number, required: true },
    finish_age: { type: Number, required: true },
    gender_id: { type: Schema.Types.ObjectId, ref: "Gender", required: true },
  },
  { timestamps: true }
);

const HumanCategory = model("HumanCategory", humanCategorySchema);

module.exports = { HumanCategory };