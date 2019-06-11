const Manga = require('../models/MangaModel.js');
const Category = require('../models/CategoryModel.js');
const settings = require('../config/settings.js');

validManga = manga => {
  manga.category = manga.category ? manga.category : 'Đang update';
  (manga.author = manga.author ? manga.author : 'Đang update'),
    (manga.status = manga.status ? manga.status : 'Đang update'),
    (manga.viewers = manga.viewers ? manga.viewers : 0),
    (manga.folowers = manga.folowers ? manga.folowers : 0),
    (manga.rating = manga.rating ? manga.rating : 0);
  return manga;
};

getAllManga = async (req, res) => {
  try {
    const result = await Manga.find({});
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ result });
  }
};

addNewManga = async (req, res) => {
  try {
    console.log('Add new manga', req.body);
    const newManga = new Manga(req.body);
    const result = await newManga.save();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

getMangaByIdCategory = async (req, res) => {
  try {
    const _id = req.body.idCate;
    const lastIdManga = req.body.lastIdManga;
    const cate = await Category.findById({ _id });
    if (cate) {
      const regex = '\\b' + cate.name + '\\b';
      //const listManga = await Manga.find({"category": { $regex: regex }});
      let filter = {
        category: { $regex: regex }
      };
      if (lastIdManga) {
        filter = {
          category: { $regex: regex },
          _id: { $gt: lastIdManga }
        };
      }
      const listManga = await Manga.find(filter).limit(settings.PAGE_LIMIT);
      res.status(200).json({ data: listManga });
    } else {
      res.status(200).json({ error: 'not found cate' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

getLatestManga = async (req, res) => {
  try {
    let page = req.body.page ? req.body.page : 1;
    const listManga = await Manga.find({})
      .sort({ updated: -1 })
      .skip((page - 1) * settings.PAGE_LIMIT)
      .limit(settings.PAGE_LIMIT);
    res.status(200).json({ data: listManga });
  } catch (error) {
    res.status(404).json({ error });
  }
};

getMostViewManga = async (req, res) => {
  try {
    let page = req.body.page ? req.body.page : 1;
    const listManga = await Manga.find({})
      .sort({ viewers: -1 })
      .skip((page - 1) * settings.PAGE_LIMIT)
      .limit(settings.PAGE_LIMIT);
    res.status(200).json({ data: listManga });
  } catch (error) {
    res.status(404).json({ error });
  }
};

getMostFavoriteManga = async (req, res) => {
  try {
    let page = req.body.page ? req.body.page : 1;
    const listManga = await Manga.find({})
      .sort({ folowers: -1 })
      .skip((page - 1) * settings.PAGE_LIMIT)
      .limit(settings.PAGE_LIMIT);
    res.status(200).json({ data: listManga });
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = {
  getAllManga,
  addNewManga,
  getMangaByIdCategory,
  getLatestManga,
  getMostViewManga,
  getMostFavoriteManga
};
