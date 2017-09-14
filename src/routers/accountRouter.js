'use strict';

const express = require('express');
const path = require('path');
const accountController = require(path.join(__dirname, '../controllers/accountController.js'));

const accountRouter = express.Router();

accountRouter.get('/login', accountController.getLoginPage);
accountRouter.get('/vcode', accountController.getVcodeImg);
accountRouter.post('/login', accountController.login);
accountRouter.get('/register', accountController.getRegisterPage);
accountRouter.post('/register', accountController.register);
accountRouter.get('/logout', accountController.logout);

module.exports = accountRouter;