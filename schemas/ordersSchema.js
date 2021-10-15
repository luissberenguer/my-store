const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
    customerId: customerId.required()
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  amount: amount.required(),
  orderId: orderId.required(),
  productId: productId.required(),
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema }