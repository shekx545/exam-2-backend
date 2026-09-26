const Joi = require("joi");

const createEventTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
  parent_event_type_id: Joi.string().optional(),
});

const updateEventTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
  parent_event_type_id: Joi.string().optional(),
});

module.exports = {
  createEventTypeValidationSchema,
  updateEventTypeValidationSchema,
};