const { Schema, model } = require("mongoose");

const regionSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Region = model("Region", regionSchema);

module.exports = { Region };