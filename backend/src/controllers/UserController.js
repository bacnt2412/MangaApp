var UserModel = require('../models/UserModel');
var settings = require('../config/settings');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken');

async function register(req, res) {
  if (req.body.username && req.body.password) {
    let checkExistUser = await UserModel.findOne({
      username: req.body.username
    });
    if (checkExistUser) {
      res.status(405).json({
        success: false,
        message: 'Username has existed'
      });
    } else {
      var newUser = await new UserModel(req.body);
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
      let result = await newUser.save();
      res.status(200).json({
        success: true,
        message: 'Register successful!'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Bad Request. Please check the request'
    });
  }
}

async function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  // For the given username fetch user from DB
  if (username && password) {
    let userLogin = await UserModel.findOne({ username });
    console.log('###', userLogin);
    if (userLogin) {
      let checkPassword = userLogin.comparePassword(password);
      if (checkPassword) {
        let token = jwt.sign({ username: username }, settings.SECRET_KEY, {
          expiresIn: '24h' // expires in 24 hours
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,
          userData: userLogin
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
}

module.exports = {
  register,
  login
};
