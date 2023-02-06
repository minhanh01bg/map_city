const express = require('express');

const authController = require('../controllers/AuthController');

let authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

module.exports = authRouter;
