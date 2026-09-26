const Joi = require("joi");

const createRegionValidationSchema = Joi.object({
  name: Joi.string().required(),
});

const updateRegionValidationSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = {
  createRegionValidationSchema,
  updateRegionValidationSchema,
};