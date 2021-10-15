const express = require('express');

const OrderService = require('../services/orderService');
const validationHandler = require('../middlewares/valitadorHandler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/ordersSchema');

const router = express.Router();
const service = new OrderService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id  } = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});


router.post('/',
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addItem(body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;