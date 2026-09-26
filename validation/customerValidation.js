const Joi = require("joi");

const createCustomerValidationSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  hashed_password: Joi.string().required(),
  email: Joi.string().email().required(),
  birth_date: Joi.date().optional(),
  gender_id: Joi.string().optional(),
  lang_id: Joi.string().optional(),
  hashed_refresh_token: Joi.string().optional().allow(""),
});

const updateCustomerValidationSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone: Joi.string().optional(),
  hashed_password: Joi.string().optional(),
  email: Joi.string().email().optional(),
  birth_date: Joi.date().optional(),
  gender_id: Joi.string().optional(),
  lang_id: Joi.string().optional(),
  hashed_refresh_token: Joi.string().optional().allow(""),
});

module.exports = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
};