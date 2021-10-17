const jwt = require('jsonwebtoken')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInBhc3N3b3JkIjoiYWRtaW4xMjM0Iiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM0NDgwNjgwfQ.AYSI9sJKuefcM247WIEKzTdkzjWss_-2jpFaEK7bVOw'
const secret = 'myLover'


function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret);
console.log(payload);