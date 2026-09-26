const Joi = require("joi");

const createDiscountValidationSchema = Joi.object({
  discount: Joi.string().required(),
  finish_date: Joi.date().optional().allow(null, ""),
});

const updateDiscountValidationSchema = Joi.object({
  discount: Joi.string().optional(),
  finish_date: Joi.date().optional().allow(null, ""),
});

module.exports = {
  createDiscountValidationSchema,
  updateDiscountValidationSchema,
};