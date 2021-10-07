const express = require('express');
const router = express.Router();

const CategoriesService = require('../services/categoriesService');
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find()
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const categorie = service.find(id);
  res.json(categorie);
});

router.get('/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;
  res.json({
    categorieId,
    productId,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCategorie = service.create(body);
  res.json(newCategorie)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateCategorie = service.update(id, body)
  res.json(updateCategorie)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedCategorie = service.deleteOne(id)
  res.json(deletedCategorie)
})

module.exports = router;
