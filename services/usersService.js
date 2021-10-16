const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {}

  async find(){
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async findOne(id){
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data){
    const newUser = await models.User.create(data, {
      include: ['customer']
    });
    return newUser;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy()
    return { rta: true }
  }
}

module.exports = UsersService;
