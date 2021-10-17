const express = require('express');
const router = express.Router();
const passport = require('passport');
const { config } = require('../config/config');
const OrderService = require('../services/orderService');
const service = new OrderService();


router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const order = await service.findByUser(user.sub);
      res.json(order)
    } catch (error) {
      next(error);
    }
});

module.exports = router;