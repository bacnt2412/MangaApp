const Manga = require('../models/MangaModel.js');

validManga = (manga)=> {
    manga.category = manga.category ? manga.category : "Đang update";
    manga.author= manga.author ?manga.author : "Đang update",
    manga.status= manga.status ?manga.status : "Đang update",
    manga.viewers= manga.viewers ?manga.viewers :0,
    manga.folowers= manga.folowers ? manga.folowers : 0,
    manga.rating=manga.rating ? manga.rating : 0
    return manga;
}
module.exports = {
  getAllManga: async (req, res) => {
    try {
      const result = await Manga.find({});
      res.status(200).json({ result });
    } catch (error) {
      res.status(404).json({ result });
    }
  },
  addNewManga: async (req, res) => {
    try {
      const newManga = new Manga(this.validManga(req.body));
      const result = await newManga.save();
      res.status(200).json({ result });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  getMangaByCategory: async (req, res) => {
    try {
      const result = await Manga.find({});
      res.status(200).json({ result });
    } catch (error) {
      res.status(404).json({ result });
    }
  }
};
