const Joi = require("joi");

const createVenuePhotoValidationSchema = Joi.object({
  venueId: Joi.string().optional(),
  url: Joi.string().trim().allow("", null),
});

const updateVenuePhotoValidationSchema = Joi.object({
  venueId: Joi.string().optional(),
  url: Joi.string().trim().allow("", null),
});

module.exports = {
  createVenuePhotoValidationSchema,
  updateVenuePhotoValidationSchema,
};