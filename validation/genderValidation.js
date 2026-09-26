const Joi = require("joi");

const createGenderValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updateGenderValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createGenderValidationSchema,
  updateGenderValidationSchema,
};