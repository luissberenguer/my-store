const { Client } = require('pg');


async function getConnection(){
  const client = new Client({
    user: 'luis',
    host: '172.19.0.3',
    database: 'my_store',
    password: 'luis1234',
    port: 5432
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
