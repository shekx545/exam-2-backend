const Joi = require("joi");

const createHumanCategoryValidationSchema = Joi.object({
  name: Joi.string().required(),
  start_age: Joi.number().required(),
  finish_age: Joi.number().required(),
  gender_id: Joi.string().required(),
});

const updateHumanCategoryValidationSchema = Joi.object({
  name: Joi.string().optional(),
  start_age: Joi.number().optional(),
  finish_age: Joi.number().optional(),
  gender_id: Joi.string().optional(),
});

module.exports = {
  createHumanCategoryValidationSchema,
  updateHumanCategoryValidationSchema,
};