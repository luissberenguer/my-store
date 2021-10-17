const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {

  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(customerId) {
    const customer = await models.Customer.findByPk(customerId, {
      include: ['user']
    })
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(customerId, changes) {
    const model = await this.findOne(customerId);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(customerId) {
    const model = await this.findOne(customerId);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
