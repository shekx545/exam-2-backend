const Joi = require("joi");

const createSeatTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updateSeatTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createSeatTypeValidationSchema,
  updateSeatTypeValidationSchema,
};