const Joi = require("joi");

const createPaymentMethodValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

const updatePaymentMethodValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
});

module.exports = {
  createPaymentMethodValidationSchema,
  updatePaymentMethodValidationSchema,
};