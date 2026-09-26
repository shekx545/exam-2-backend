const Joi = require("joi");

const createCartValidationSchema = Joi.object({
    customer_id: Joi.string().optional(),
    createdAt: Joi.string().trim().allow("", null),
    fineshedAt: Joi.string().trim().allow("", null),
    status_id: Joi.string().optional(),
});

const updateCartValidationSchema = Joi.object({
    createdAt: Joi.string().trim().allow("", null),
    fineshedAt: Joi.string().trim().allow("", null),
});

module.exports = {
    createCartValidationSchema,
    updateCartValidationSchema,
}