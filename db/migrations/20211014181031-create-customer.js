'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customerModel')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    // Si tienes varios modelos los vas poniendo de uno a uno aquí
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE)
    // Si tienes varios modelos los vas poniendo de uno a uno aquí
  }
};
