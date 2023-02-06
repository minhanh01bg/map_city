const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

const AuthController = require('../controllers/AuthController');

let authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);

module.exports = authRouter;
