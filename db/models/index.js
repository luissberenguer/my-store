const { UserSchema, User } = require('./userModel')
const { CustomerSchema, Customer } = require('./customerModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)

}

module.exports = setupModels;
