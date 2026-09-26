const Joi = require("joi");

const createSectorValidationSchema = Joi.object({
  sector_name: Joi.string().trim().allow("", null),
});

const updateSectorValidationSchema = Joi.object({
  sector_name: Joi.string().trim().allow("", null),
});

module.exports = {
  createSectorValidationSchema,
  updateSectorValidationSchema,
};