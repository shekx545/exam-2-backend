const Joi = require("joi");

const createEventValidationSchema = Joi.object({
  name: Joi.string().required(),
  photo: Joi.string().optional().allow(""),
  start_date: Joi.date().required(),
  start_time: Joi.string().required(),
  finish_date: Joi.date().required(),
  finish_time: Joi.string().required(),
  info: Joi.string().optional().allow(""),
  event_type_id: Joi.string().required(),
  human_category_id: Joi.string().required(),
  venue_id: Joi.string().required(),
  lang_id: Joi.string().required(),
  release_date: Joi.date().optional(),
});

const updateEventValidationSchema = Joi.object({
  name: Joi.string().optional(),
  photo: Joi.string().optional().allow(""),
  start_date: Joi.date().optional(),
  start_time: Joi.string().optional(),
  finish_date: Joi.date().optional(),
  finish_time: Joi.string().optional(),
  info: Joi.string().optional().allow(""),
  event_type_id: Joi.string().optional(),
  human_category_id: Joi.string().optional(),
  venue_id: Joi.string().optional(),
  lang_id: Joi.string().optional(),
  release_date: Joi.date().optional(),
});

module.exports = {
  createEventValidationSchema,
  updateEventValidationSchema,
};