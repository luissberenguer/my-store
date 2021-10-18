const UserService = require('./usersService')
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { config } = require('../config/config');
const nodemailer = require("nodemailer");

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload =  { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15 min' })
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: 'luis01developer@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recupera tu contraseña", // Subject line
      html: `<b>Hola Luis, ingresa a este link: ${link}</b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail){
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: config.smtpUser,
          pass: config.smtpPassword
      }
    });
    // send mail with defined transport object
    await transporter.sendMail(infoMail);
    return { message: 'mail sended'}
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (!user.recoveryToken === token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, {password: hash, recoveryToken: null})
      return { message: 'password changed'}
    } catch (error) {
        throw boom.unauthorized();
    }
  }

}

module.exports = AuthService;
