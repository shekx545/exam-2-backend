const Joi = require("joi");

const createCustomerAddressValidationSchema = Joi.object({
  customer_id: Joi.string().required(),
  name: Joi.string().required(),
  region_id: Joi.string().required(),
  district_id: Joi.string().required(),
  street: Joi.string().required(),
  house: Joi.string().required(),
  flat_id: Joi.number().required(),
  location: Joi.string().optional().allow(""),
  post_index: Joi.string().optional().allow(""),
  info: Joi.string().optional().allow(""),
});

const updateCustomerAddressValidationSchema = Joi.object({
  customer_id: Joi.string().optional(),
  name: Joi.string().optional(),
  region_id: Joi.string().optional(),
  district_id: Joi.string().optional(),
  street: Joi.string().optional(),
  house: Joi.string().optional(),
  flat_id: Joi.number().optional(),
  location: Joi.string().optional().allow(""),
  post_index: Joi.string().optional().allow(""),
  info: Joi.string().optional().allow(""),
});

module.exports = {
  createCustomerAddressValidationSchema,
  updateCustomerAddressValidationSchema,
};