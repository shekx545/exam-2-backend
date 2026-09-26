const Joi = require("joi");

const createCartItemValidationSchema = Joi.object({
  ticket_id: Joi.string().optional(),
  cart_id: Joi.string().optional(),
});

const updateCartItemValidationSchema = Joi.object({
  ticket_id: Joi.string().optional(),
  cart_id: Joi.string().optional(),
});

module.exports = {
  createCartItemValidationSchema,
  updateCartItemValidationSchema,
};