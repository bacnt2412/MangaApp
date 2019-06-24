const Image = require('../models/ImageChapterModel.js');
const settings = require('../config/settings.js');
const DbService = require('../services/DbSerivce');

getAllImage = async (req, res) => {
  try {
    const listImage = await Image.find({});
    res.status(200).json({ listImage });
  } catch (error) {
    res.status(400).json({ error });
  }
};

getImageByIdChapter = async (req, res) => {
  try {
    let filter = {
      idchapter: req.body.idChapter
    };
    const lastIdImage = req.body.lastIdImage;
    if (lastIdImage) {
      filter = {
        idchapter: req.body.idChapter,
        _id: { $gt: lastIdImage }
      };
    }
    const listImage = await Image.find(filter)
      .sort({ _id: 1 })
      .limit(settings.PAGE_LIMIT);
    res.status(200).json({ listImage });
  } catch (error) {
    console.log('################# Error: ', error);
    res.status(400).json({ error });
  }
};

getAllImageByIdChapter = async (req, res) => {
  try {
    let idChapter = req.body.idChapter;
    let listImage = await DbService.getAllImageByIdChapter(idChapter);
    res.status(200).json({ listImage });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllImage,
  getImageByIdChapter,
  getAllImageByIdChapter
};
