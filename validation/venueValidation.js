const Joi = require("joi");

const createVenueValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  location: Joi.string().optional().allow(""),
  site: Joi.string().optional().allow(""),
  phone: Joi.string().required(),
  schema: Joi.string().optional().allow(""),
  region_id: Joi.string().required(),
  district_id: Joi.string().required(),
});

const updateVenueValidationSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  location: Joi.string().optional().allow(""),
  site: Joi.string().optional().allow(""),
  phone: Joi.string().optional(),
  schema: Joi.string().optional().allow(""),
  region_id: Joi.string().optional(),
  district_id: Joi.string().optional(),
});

module.exports = {
  createVenueValidationSchema,
  updateVenueValidationSchema,
};