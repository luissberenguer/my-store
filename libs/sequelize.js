const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: 'localhost',
  dialect: 'postgres'
});

setupModels(sequelize);

module.exports = sequelize;
