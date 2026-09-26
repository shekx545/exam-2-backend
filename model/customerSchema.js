const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birth_date: { type: Date },
    gender_id: { type: Schema.Types.ObjectId, ref: "Gender" },
    lang_id: { type: Schema.Types.ObjectId, ref: "Language" },
    hashed_refresh_token: { type: String },
  },
  { timestamps: true }
);

const Customer = model("Customer", customerSchema);

module.exports = { Customer };