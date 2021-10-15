const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    // const newUser = await models.User.create(data.user); // It's going to ignore what it does not need
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
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
