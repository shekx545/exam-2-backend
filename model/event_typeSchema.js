const { Schema, model } = require("mongoose");

const event_typeSchema = new Schema(
  {
    name: { type: String, required: true },
    parent_event_type_id: { type: Schema.Types.ObjectId, ref: "Event_type" },
  }
);

const Event_type = model("Event_type", event_typeSchema);

module.exports = { Event_type };