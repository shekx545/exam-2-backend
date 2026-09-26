const Joi = require("joi");

const createTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updateTypeValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createTypeValidationSchema,
  updateTypeValidationSchema,
};