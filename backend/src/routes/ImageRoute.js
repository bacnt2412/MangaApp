var express = require('express');
var ImageRoute = express.Router();
const ImageController = require('../controllers/ImageController');

ImageRoute.route('/get-image-by-id-chapter').post(ImageController.getImageByIdChapter);
ImageRoute.route('/get-all-image').post(ImageController.getAllImage);
ImageRoute.route('/get-all-image-by-id-chapter').post(ImageController.getAllImageByIdChapter);

module.exports = ImageRoute;
