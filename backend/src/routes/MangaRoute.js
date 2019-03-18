const express = require('express');
const MangaRoute = express.Router();
const MangaController = require('../controllers/MangaController');

MangaRoute.route('/get-all-manga').get(MangaController.getAllManga);
MangaRoute.route('/add-new-manga').post(MangaController.addNewManga);

module.exports = MangaRoute;