const Joi = require("joi");

const createBookingValidationSchema = Joi.object({
  cart_id: Joi.string().optional(),
  payment_method_id: Joi.string().optional(),
  delivery_method_id: Joi.string().optional(),
  discount_id: Joi.string().optional(),
  status_id: Joi.string().optional(),
  createdAt: Joi.string().trim().allow("", null),
  fineshed: Joi.string().trim().allow("", null),
});

const updateBookingValidationSchema = Joi.object({
  cart_id: Joi.string().optional(),
  payment_method_id: Joi.string().optional(),
  delivery_method_id: Joi.string().optional(),
  discount_id: Joi.string().optional(),
  status_id: Joi.string().optional(),
  createdAt: Joi.string().trim().allow("", null),
  fineshed: Joi.string().trim().allow("", null),
});

module.exports = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};