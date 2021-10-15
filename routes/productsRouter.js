const express = require('express');
const router = express.Router();

const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/valitadorHandler');
const { getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema, queryProductSchema } = require('../schemas/productSchema');

const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products)
    } catch (error) {
      next(error);
    }
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filter');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json({
      message: 'Product found',
      data: product
    })
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error);
    }
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateProduct = await service.update(id, body);
    res.json(updateProduct);
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = await service.deleteOne(id);
      res.json(deletedProduct)
    } catch (error) {
      next(error);
    }
})


module.exports = router;
