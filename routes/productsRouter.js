const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productsService');

const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});

router.get('/filter', (req, res) => {
  res.send('Esto es un filter');
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json({
    message: 'Product found',
    data: product
  })
})

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateProduct = service.update(id, body);
  res.json(updateProduct);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = service.deleteOne(id);
  res.json(deletedProduct)
})


module.exports = router;
