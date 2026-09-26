const Joi = require("joi");

const createDistrictValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
  region_id: Joi.string().optional(),
});

const updateDistrictValidationSchema = Joi.object({
  name: Joi.string().trim().allow("", null),
  region_id: Joi.string().optional(),
});

module.exports = {
  createDistrictValidationSchema,
  updateDistrictValidationSchema,
};