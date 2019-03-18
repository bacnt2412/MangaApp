const express = require('express');
const ChapterRoute = express.Router();
const ChapterController = require('../controllers/ChapterControler.js');

ChapterRoute.route('/add-new-chapter').post(ChapterController.addNewChapter);
ChapterRoute.route('/get-all-chapter').get(ChapterController.getAllChapter);

module.exports = ChapterRoute;