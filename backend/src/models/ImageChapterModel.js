const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageChapter = new Schema({
  name: {
    type: String,
    required: [true, 'Name image is Required']
  },
  link: {
    type: String,
    required: [true, 'Link image is Required']
  },
  idchapter: {
    type: String,
    required: [true, 'Id chapter is Required']
  }
});
const ImageChapter = mongoose.model('imagechapter',imageChapter);
 module.exports = ImageChapter;
