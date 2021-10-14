const faker = require('faker');
const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');


class UsersService {
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        gender: faker.name.gender(),
      })
    }
  }

  async create(data){
    const newUser = await models.User.create(data, {
      include: ['customer']
    });
    return newUser;
  }

  async find(){
    const dta = await models.User.findAll({
      include: ['customer']
    });
    return dta;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async deleteOne(id){
    const user = await this.findOne(id);
    await user.destroy()
    return { id }
  }
}

module.exports = UsersService;
