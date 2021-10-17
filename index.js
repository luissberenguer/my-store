const express = require('express');
const routerApi = require('./routes/index');
require('./')
const app = express();
const port = process.env.PORT || 3000;
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/authHandler')
const passport = require('passport');

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.use(passport.initialize());
require('./utils/auth/index');


app.get('/', (req, res) => {
  res.send('Hola mi server en Expr/*  */ess')
})

app.get('/nueva-ruta', checkApiKey,  (req, res) => {
  res.send('Hola soy una nueva ruta')
})

app.get('/home', (req, res) => {
  res.send('Aquí encontrarás nuestra página principal')
})



routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
})
