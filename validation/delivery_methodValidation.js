const Joi = require("joi");

const createDeliveryMethodValidationSchema = Joi.object({
  name: Joi.string().required(),
});

const updateDeliveryMethodValidationSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = {
  createDeliveryMethodValidationSchema,
  updateDeliveryMethodValidationSchema,
};