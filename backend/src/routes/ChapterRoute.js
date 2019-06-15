const express = require('express');
const ChapterRoute = express.Router();
const ChapterController = require('../controllers/ChapterControler.js');

ChapterRoute.route('/add-new-chapter').post(ChapterController.addNewChapter);
ChapterRoute.route('/get-chapter-by-id-manga').post(ChapterController.getChapterByIdManga);
ChapterRoute.route('/get-all-chapter-by-id-manga').post(ChapterController.getAllChapterByIdManga);


module.exports = ChapterRoute;