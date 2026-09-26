const Joi = require("joi");

const createFlatValidationSchema = Joi.object({
  etaj: Joi.string().trim().allow("", null),
  condition: Joi.string().trim().allow("", null),
});

const updateFlatValidationSchema = Joi.object({
  etaj: Joi.string().trim().allow("", null),
  condition: Joi.string().trim().allow("", null),
});

module.exports = {
  createFlatValidationSchema,
  updateFlatValidationSchema,
};