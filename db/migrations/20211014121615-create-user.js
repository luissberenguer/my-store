'use strict';

const { USER_TABLE, UserSchema } = require('../models/userModel')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    // Si tienes varios modelos los vas poniendo de uno a uno aquí
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE)
    // Si tienes varios modelos los vas poniendo de uno a uno aquí
  }
};
