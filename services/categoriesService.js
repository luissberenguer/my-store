const faker = require('faker');
const { models } = require('../libs/sequelize.js')

class CategoriesService {
  constructor(){

  }

  async create(data){
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(){
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id){
    const category = await models.Category.findByPk(id, {
      include: ['products'],
      foreignKey: 'categoryId',
    });
    if(!category) {
    throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes){
    const category = await this.findOne(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async delete(id){
    const category = await this.findOne(id);
    await category.destroy();
    return { rta: true }
  }
}

module.exports = CategoriesService;
