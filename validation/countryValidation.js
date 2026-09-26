const Joi = require("joi");

const createCountryValidationSchema = Joi.object({
  country_name: Joi.string().required(),
});

const updateCountryValidationSchema = Joi.object({
  country_name: Joi.string().optional(),
});

module.exports = {
  createCountryValidationSchema,
  updateCountryValidationSchema,
};