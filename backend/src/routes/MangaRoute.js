const express = require('express');
const MangaRoute = express.Router();
const MangaController = require('../controllers/MangaController');

MangaRoute.route('/get-all-manga').get(MangaController.getAllManga);
MangaRoute.route('/add-new-manga').post(MangaController.addNewManga);
MangaRoute.route('/get-manga-by-id-category').post(MangaController.getMangaByIdCategory);
MangaRoute.route('/get-latest-manga').post(MangaController.getLatestManga);
MangaRoute.route('/get-most-view-manga').post(MangaController.getMostViewManga);
MangaRoute.route('/get-most-favorite-manga').post(MangaController.getMostFavoriteManga);
MangaRoute.route('/update-view-manga').post(MangaController.updateViewManga);
MangaRoute.route('/follow-manga').post(MangaController.followManga);
MangaRoute.route('/unfollow-manga').post(MangaController.unfollowManga);
MangaRoute.route('/update-history-manga').post(MangaController.updateHistoryManga);
MangaRoute.route('/get-history-manga').post(MangaController.getListHistoryManga);
MangaRoute.route('/get-follow-manga').post(MangaController.getFollowManga);
MangaRoute.route('/get-manga-by-id').post(MangaController.getMangaById);
MangaRoute.route('/get-total-image-by-id-chapter').post(MangaController.getTotalImageOfManga);
MangaRoute.route('/search-by-name').post(MangaController.searchMangaByName);


module.exports = MangaRoute;
