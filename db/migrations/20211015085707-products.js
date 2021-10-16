'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/categoryModel')
const { PRODUCT_TABLE, ProductSchema } = require('../models/productModel')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
