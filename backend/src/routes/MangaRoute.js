const express = require('express');
const MangaRoute = express.Router();
const MangaController = require('../controllers/MangaController');

MangaRoute.route('/get-all-manga').get(MangaController.getAllManga);
MangaRoute.route('/add-new-manga').post(MangaController.addNewManga);
MangaRoute.route('/get-manga-by-id-category').post(MangaController.getMangaByIdCategory);

module.exports = MangaRoute;