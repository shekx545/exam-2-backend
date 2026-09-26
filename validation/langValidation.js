const Joi = require("joi");

const createLangValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updateLangValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createLangValidationSchema,
  updateLangValidationSchema,
};