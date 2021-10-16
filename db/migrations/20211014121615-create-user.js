'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../models/userModel')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE)
  }
};
