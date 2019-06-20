const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historyManga = new Schema({
  iduser: {
    type: String,
    required: [true, 'id user is Required']
  },
  idmanga: {
    type: String,
    required: [true, 'idManga is Required']
  },
  idchapter: {
    type: String,
    required: [true, 'idChapter is Required']
  },
  updated: {
    type: Date,
    default: Date.now
  }
});
const HistoryManga = mongoose.model('HistoryManga', historyManga);
module.exports = HistoryManga;
