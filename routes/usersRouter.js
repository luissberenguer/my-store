const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../utils/auth/index');

const UsersService = require('../services/usersService');
const service = new UsersService();

const validatorHandler = require('../middlewares/valitadorHandler');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/userSchema');

// validatorHandler(schema, property)
router.get('/', async (req, res) => {
  const user = await service.find();
  res.json(user)
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id)
      res.json(user)
    } catch (error) {
      next(error);
    }
})

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json(newUser)
      } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updateUser = await service.update(id, body)
      res.json(updateUser)
    } catch (error) {
      next(error);
    }
})

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await service.delete(id)
      res.json(deletedUser)
    } catch (error) {
      next(error);
    }
})

module.exports = router;
