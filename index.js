const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = 3000;
const { logErrors, errorHandler } = require('./middlewares/errorHandler');

app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hola mi server en Express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta')
})

app.get('/home', (req, res) => {
  res.send('Aquí encontrarás nuestra página principal')
})

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port)
})
