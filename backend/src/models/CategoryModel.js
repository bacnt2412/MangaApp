const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: [true, 'Name is not null']
  },
  link: {
    type: String,
    minlength: 3,
    required: [true, 'Link is not null']
  }
});

const Catregory = mongoose.model('catregory', categorySchema);
module.exports = Catregory;
