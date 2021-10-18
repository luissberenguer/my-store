'use strict';
const { USER_TABLE } = require('../models/userModel')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
        allowNull: true,
        field: 'recovey_token',
        type: Sequelize.DataTypes.STRING,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
