const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: String,
  author: String,
  status: String,
  viewers: String,
  folowers: String,
  rating: String,
  thumbnail: String,
  link: String,
  latestChapter: String
});
const Manga = mongoose.model('manga', mangaSchema);
module.exports = Manga;
