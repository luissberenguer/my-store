const { Pool } = require('pg');
const { config } = require('../config/config');

let URI = ''
if (config.isProd) {
    URI = config.dbUrl;
} else {
const USER = encodeURIComponent(config.dbUser);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}${config.dbPort}/${config.dbName}`
const PASSWORD = encodeURIComponent(config.dbPassword);
}

const pool = new Pool({ connectionString: URI});



module.exports = pool;
