const Chapter = require('../models/ChapterModel.js');
const DbServices = require('../services/DbSerivce');
module.exports = {
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
      let idManga = req.body.idManga;
      let page = req.body.page ? req.body.page : 1;

      const listChapter = await DbServices.getListChapterByIdManga(
        idManga,
        page
      );
      res.status(200).json({ listChapter });
    } catch (error) {
      console.log('#################', error);
      res.status(400).json({ error });
    }
  },
  getAllChapterByIdManga: async (req, res) => {
    try {
      let idManga = req.body.idManga;
      const listChapter = await DbServices.getListAllChapterByIdManga(idManga);
      res.status(200).json({ listChapter });
    } catch (error) {
      console.log('#################', error);
      res.status(400).json({ error });
    }
  }
};
