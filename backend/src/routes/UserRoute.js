var express = require('express');
var UserRoute = express.Router();
var UserController = require('../controllers/UserController');

UserRoute.route('/register').post(UserController.register);
UserRoute.route('/login').post(UserController.login);

module.exports = UserRoute;
