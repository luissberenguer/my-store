const jwt = require('jsonwebtoken')

const secret = 'myLover'

const payload = {
  sub: 1,
  password: 'admin1234',
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret);
console.log(token);
