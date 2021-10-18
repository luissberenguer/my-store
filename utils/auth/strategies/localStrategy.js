const { Strategy } = require('passport-local') // This is a class


const AuthService = require('../../../services/authService');
const service = new AuthService();
const LocalStraregy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error)
    }
}); // Inizialization

module.exports = LocalStraregy;
