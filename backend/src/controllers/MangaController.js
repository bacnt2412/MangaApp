const Manga = require('../models/MangaModel.js');
const Category = require('../models/CategoryModel.js');
const settings = require('../config/settings.js');
const DbServices = require('../services/DbSerivce');

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
    const listManga = await Manga.find({});
    res.status(200).json({ listManga });
  } catch (error) {
    res.status(404).json({ error });
  }
};

addNewManga = async (req, res) => {
  try {
    console.log('Add new manga', req.body);
    const newManga = new Manga(req.body);
    const result = await newManga.save();
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// function addValueInObject(object, key, value) {
//   var res = {};
//   var textObject = JSON.stringify(object);
//   if (textObject === '{}') {
//     res = JSON.parse('{"' + key + '":"' + value + '"}');
//   } else {
//     res = JSON.parse(
//       '{' +
//         textObject.substring(1, textObject.length - 1) +
//         ',"' +
//         key +
//         '":"' +
//         value +
//         '"}'
//     );
//   }
//   return res;
// }
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
          _id: { $lt: lastIdManga }
        };
      }
      let listManga = await Manga.find(filter)
        .sort({ _id: -1 })
        .limit(settings.PAGE_LIMIT);
      res.status(200).json({ listManga });
    } else {
      res.status(404).json({ error: 'not found cate' });
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
    res.status(200).json({ listManga });
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
    res.status(200).json({ listManga });
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
    res.status(200).json({ listManga });
  } catch (error) {
    res.status(404).json({ error });
  }
};

updateViewManga = async (req, res) => {
  try {
    let idManga = req.body.idManga;
    let idUser = req.decoded._id;
    let idChapter = req.body.idChapter;

    let result = await DbServices.updateHistoryManga(
      idUser,
      idManga,
      idChapter
    );
    result = await DbServices.updateViewManga(idManga);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

followManga = async (req, res) => {
  try {
    let idManga = req.body.idManga;
    let idUser = req.decoded._id;
    if (idManga && idUser) {
      let result = await DbServices.followManga(idUser, idManga);
      res.status(200).json({ message: result });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
unfollowManga = async (req, res) => {
  try {
    let idManga = req.body.idManga;
    let idUser = req.decoded._id;
    if (idManga && idUser) {
      let result = await DbServices.unfollowManga(idUser, idManga);
      res.status(200).json({ message: result });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

updateHistoryManga = async (req, res) => {
  try {
    let idManga = req.body.idManga;
    let idUser = req.decoded._id;
    let idChapter = req.body.idChapter;
    if (idManga && idUser) {
      let result = await DbServices.updateHistoryManga(
        idUser,
        idManga,
        idChapter
      );
      res.status(200).json({ message: result });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

getListHistoryManga = async (req, res) => {
  try {
    let page = req.body.page;
    let idUser = req.decoded._id;
    if (idUser) {
      if (!page) page = 1;
      let listHistory = await DbServices.getListHistoryManga(idUser, page);
      res.status(200).json({ listHistory });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
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
  getMostFavoriteManga,
  updateViewManga,
  followManga,
  unfollowManga,
  updateHistoryManga,
  getListHistoryManga
};
