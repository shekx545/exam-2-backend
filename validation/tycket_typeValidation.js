const Joi = require("joi");

const createTycketTypeValidationSchema = Joi.object({
  ticket_type: Joi.string().trim().allow("", null),
});

const updateTycketTypeValidationSchema = Joi.object({
  ticket_type: Joi.string().trim().allow("", null),
});

module.exports = {
  createTycketTypeValidationSchema,
  updateTycketTypeValidationSchema,
};