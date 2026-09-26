const { Schema, model } = require("mongoose");

const sectorSchema = new Schema(
  {
    sector_name: { type: String, required: true },
  }
);

const Sector = model("Sector", sectorSchema);

module.exports = { Sector };