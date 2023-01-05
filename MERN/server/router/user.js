const express = require('express');
const multiparty = require('connect-multiparty');
const UserController = require('../controllers/user');
const asureAuth = require('../middlewares/autenticated');

const md_upload = multiparty({uploadDir: './uploads/avatar'});
const api = express.Router();

api.get('/user/me', asureAuth, UserController.getMe);
api.get('/user/users', asureAuth, UserController.getUsers);
api.post('/user', [asureAuth, md_upload], UserController.createUser);
api.patch("/user/:id", [asureAuth, md_upload], UserController.updateUser);
api.delete("/user/:id", [asureAuth, md_upload], UserController.deleteUser);
module.exports=api;
