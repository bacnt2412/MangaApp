const Chapter = require('../models/ChapterModel.js');
const settings = require('../config/settings.js');

module.exports = {
  getAllChapter: async (req, res, next) => {
    try {
      const data = await Chapter.find({});
      res.status(200).json({ data });
    } catch (error) {
      res.status(404).json({ error });
    }
  },
  addNewChapter: async (req, res, next) => {
    try {
      const chapter = new Chapter(req.body);
      const result = await chapter.save();
      res.status(200).json({ result });
    } catch (error) {
      res.status(404).json({ error });
    }
  },
  getChapterByIdManga: async (req, res) => {
    try {
      console.log('#################', req.body);
      let filter = {
        idmanga: req.body.idChaprer
      };
      const lastIdChapter = req.body.lastIdChapter;
      if (lastIdChapter) {
        filter = {
          idmanga: req.body.idChaprer,
          lastIdChapter
        };
      }
      const listChapter = await Chapter.find(filter).limit(settings.PAGE_LIMIT);
      res.status(200).json({ listChapter });
    } catch (error) {
      console.log('#################', req.body);
      res.status(400).json({ error });
    }
  }
};
