const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('../services/authService');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log('[user] ', user);
      res.json(service.signToken(user))
    } catch (error) {
      next(error);
    }
});

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
});

router.post('/change-password',
  // validateSchema()
  async (req, res, next) => {
    try {
      const { token, newPassword  } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
});


module.exports = router;
