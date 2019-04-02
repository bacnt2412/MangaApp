var express = require('express');
var ImageRoute = express.Router();
const ImageController = require('../controllers/ImageController');

ImageRoute.route('/get-image-by-id-chapter').post(ImageController.getImageByIdChapter);

module.exports = ImageRoute;