const Joi = require("joi");

const createAdminValidationSchema = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  is_active: Joi.boolean().default(true), 
  is_creator: Joi.boolean().default(false), 
});

const updateAdminValidationSchema = Joi.object({
  name: Joi.string().optional(),
  login: Joi.string().optional(),
  password: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
  is_creator: Joi.boolean().optional(),
});

module.exports = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
}; 