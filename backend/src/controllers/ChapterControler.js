const Chapter = require('../models/ChapterModel.js');
const settings = require('../config/settings.js');

module.exports = {
  getAllChapter: async (req, res, next) => {
    try {
      const data = await Chapter.find({});
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(404).json({ error });
    }
  },
  addNewChapter: async (req, res, next) => {
    try {
      const chapter = new Chapter(req.body);
      const result = await chapter.save();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(404).json({ error });
    }
  },
  getChapterByIdManga: async (req, res) => {
    try {
 

      let filter = {
        idmanga: req.body.idManga
      };
      const listChapter = await Chapter.find(filter);
      res.status(200).json({ data: listChapter });
    } catch (error) {
      console.log('#################', error);
      res.status(400).json({ error });
    }
  }
};
