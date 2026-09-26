const Joi = require("joi");

const createTicketStatusValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updateTicketStatusValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createTicketStatusValidationSchema,
  updateTicketStatusValidationSchema,
};