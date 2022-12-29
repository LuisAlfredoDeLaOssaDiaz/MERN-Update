const express = require('express');
const UserController = require('../controllers/user');
const asureAuth = require('../middlewares/autenticated');

const api = express.Router();

api.get('/user/me', asureAuth, UserController.getMe);


module.exports=api;
