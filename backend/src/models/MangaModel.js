const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: String,
  author: String,
  status: {
    type: String,
    default: 'Updating'
  },
  description: {
    type: String,
    default: ''
  },
  viewers: {
    type: Number,
    default: 0
  },
  folowers: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  thumbnail: String,
  link: String,
  latestChapter: {
    type: String,
    default: 'Updating'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});
const Manga = mongoose.model('manga', mangaSchema);
module.exports = Manga;
