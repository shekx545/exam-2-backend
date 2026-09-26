const Joi = require("joi");

const createCustomerCardValidationSchema = Joi.object({
  customer_id: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  number: Joi.string().required(),
  year: Joi.string().length(2).required(),
  month: Joi.string().length(2).required(),
  is_active: Joi.boolean().optional(),
  is_main: Joi.boolean().optional(),
});

const updateCustomerCardValidationSchema = Joi.object({
  customer_id: Joi.string().optional(),
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  number: Joi.string().optional(),
  year: Joi.string().length(2).optional(),
  month: Joi.string().length(2).optional(),
  is_active: Joi.boolean().optional(),
  is_main: Joi.boolean().optional(),
});

module.exports = {
  createCustomerCardValidationSchema,
  updateCustomerCardValidationSchema,
};