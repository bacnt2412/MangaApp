const Category = require('../models/CategoryModel.js');

const CategoryController = {
  getAllCategory: async (req, res, next) => {
    try {
      const result = await Category.find({}).sort({_id: 1});
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  addNewCategory: async (req, res, next) => {
    try {
      const newCategory = new Category(req.body);
      const result = await newCategory.save();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const result = await Category.findById(req.body.id).remove();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};
module.exports = CategoryController;
