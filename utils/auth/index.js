const passport = require('passport');
const LocalStraregy = require('./strategies/localStrategy')
const JwtStrategy = require('./strategies/jwtStrategy')

passport.use(LocalStraregy);
passport.use(JwtStrategy)
