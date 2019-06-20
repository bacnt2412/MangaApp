const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const User = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    default: 'system'
  },
  listIdMangaFollow: {
    type: String,
    default: ''
  },
  listAppId: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
});

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const UserSchema = mongoose.model('user', User);
module.exports = UserSchema;
