const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {

  constructor() {}

  async find(){
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async findByEmail(email){
    const user = await models.User.findOne({
      where: { email }
    });
    return user;
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
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
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
