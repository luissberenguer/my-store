const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config')
const boom = require('@hapi/boom');

const UsersService = require('../../../services/usersService');
const service = new UsersService();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}
const JwtStrategy  = new Strategy(options, (payload, done) => {
    return done(null, payload)
})

module.exports = JwtStrategy;