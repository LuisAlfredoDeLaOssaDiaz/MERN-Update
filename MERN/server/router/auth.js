const express = require('express');
const AutchController = require('../controllers/auth.js');

const api = express.Router();

api.post('/auth/register', AutchController.register);
api.post('/auth/login', AutchController.login);
api.post('/auth/refresh_access_token', AutchController.refreshAccessToken)

module.exports = api;