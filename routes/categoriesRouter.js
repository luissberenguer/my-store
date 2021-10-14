const express = require('express');
const router = express.Router();

const CategoriesService = require('../services/categoriesService');
const service = new CategoriesService();

const validatorHandler = require('../middlewares/valitadorHandler');
const { getCategorySchema, createCategorySchema, updateCategorySchema  } = require('../schemas/categoriesSchema');


router.get('/',
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
      const categorie = await service.find(id);
      res.json(categorie);
    } catch (error) {
      next(error);
    }
});

router.get('/:categorieId/products/:productId', async (req, res) => {
  const { categorieId, productId } = req.params;
  res.json({
    categorieId,
    productId,
  });
});

router.post('/',
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
