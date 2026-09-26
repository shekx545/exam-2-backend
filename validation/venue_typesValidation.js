const Joi = require("joi");

const createVenueTypeValidationSchema = Joi.object({
  venueId: Joi.string().optional(),
  typeId: Joi.string().optional(),
});

const updateVenueTypeValidationSchema = Joi.object({
  venueId: Joi.string().optional(),
  typeId: Joi.string().optional(),
});

module.exports = {
  createVenueTypeValidationSchema,
  updateVenueTypeValidationSchema,
};