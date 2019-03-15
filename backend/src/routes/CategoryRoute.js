const express = require('express');
const CategoryController = require('../controllers/CategoryController.js');
const CategoryRoute = express.Router();

CategoryRoute.route('/get-all-category').get(CategoryController.getAllCategory);
CategoryRoute.route('/add-new-category').post(CategoryController.addNewCategory);
CategoryRoute.route('/delete-category').post(CategoryController.deleteCategory);

module.exports = CategoryRoute;
