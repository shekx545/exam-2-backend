const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_creator: { type: Boolean, default: false },
  hashed_refresh_token: { type: String, default: null },
});

const Admin = model("admin", adminSchema);

module.exports = { Admin };