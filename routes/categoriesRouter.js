const express = require('express');
const router = express.Router();

const CategoriesService = require('../services/categoriesService.js')
const service = new CategoriesService();

const validatorHandler = require('../middlewares/valitadorHandler');
const { getCategorySchema, createCategorySchema, updateCategorySchema  } = require('../schemas/categoriesSchema');

const passport = require('passport');
require('../utils/auth/index');
const { checkAdminRole, checkRole } = require('../middlewares/authHandler');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const categories = await service.find()
      res.json(categories);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categorie = await service.findOne(id);
      res.json(categorie);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'customer'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategorie = await service.create(body);
      res.json(newCategorie)
    } catch (error) {
      next(error);
    }
})

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategorie = await service.update(id, body)
      res.json(updateCategorie)
    } catch (error) {
      next(error);
    }
})

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategorie = await service.deleteOne(id)
      res.json(deletedCategorie)
    } catch (error) {
      next(error);
    }
})

module.exports = router;
