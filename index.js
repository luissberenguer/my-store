const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en Express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta')
})

app.get('/home', (req, res) => {
  res.send('Aquí encontrarás nuestra página principal')
})

app.get('/products', (req, res) => {
  const products = [];
  const { size } =  req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }

  res.json(products)
});

app.get('/special-products', (req, res) => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      imageUrl: faker.image.imageUrl(),
      image: faker.image.cats(),
      datatype: faker.datatype.json()
    })
  }

  res.json(products)
});

app.get('/products/filter', (req, res) => {
  res.send('Esto es un filter');
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto 1',
    price: 1000,
  })
})

app.get('/categories/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId} = req.params;
  res.json({
    categorieId,
    productId
  })
})


app.get('/categories', (req, res) => {
  res.json([
    {
      blue: true,
      green: false,
    },
    {
      blue: false,
      red: true,
    }
  ])
})

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    blue: true,
    green: false,
  })
})

app.get('/people', (req, res) => {
  res.json([
    {
    name: 'Luis',
    age: 23,
    role: 'Backend Engineer'
  },
  {
    name: 'Paula',
    age: 25,
    role: 'Product Design'
  }
  ])
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('No existe los parámetros.')
  }
});


app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Luis',
    age: 23,
    role: 'Backend Engineer'
  })
})

app.listen(port, () => {
  console.log('My port: ' + port)
})
