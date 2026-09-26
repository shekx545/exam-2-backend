const Joi = require("joi");

const createTicketValidationSchema = Joi.object({
  event_id: Joi.string().required(),
  seat_id: Joi.string().required(),
  price: Joi.number().required(),
  service_fee: Joi.number().required(),
  status_id: Joi.string().required(),
  ticket_type_id: Joi.string().required(),
});

const updateTicketValidationSchema = Joi.object({
  event_id: Joi.string().optional(),
  seat_id: Joi.string().optional(),
  price: Joi.number().optional(),
  service_fee: Joi.number().optional(),
  status_id: Joi.string().optional(),
  ticket_type_id: Joi.string().optional(),
});

module.exports = {
  createTicketValidationSchema,
  updateTicketValidationSchema,
};