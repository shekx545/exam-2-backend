const Joi = require("joi");

const createSeatValidationSchema = Joi.object({
  sector_id: Joi.string().required(),
  row_number: Joi.number().required(),
  number: Joi.number().required(),
  venue_id: Joi.string().required(),
  seat_type_id: Joi.string().required(),
  location_in_schema: Joi.string().optional().allow(""),
});

const updateSeatValidationSchema = Joi.object({
  sector_id: Joi.string().optional(),
  row_number: Joi.number().optional(),
  number: Joi.number().optional(),
  venue_id: Joi.string().optional(),
  seat_type_id: Joi.string().optional(),
  location_in_schema: Joi.string().optional().allow(""),
});

module.exports = {
  createSeatValidationSchema,
  updateSeatValidationSchema,
};