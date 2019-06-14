const CategoryModel = require('../models/CategoryModel');
const MangaModel = require('../models/MangaModel');
const ChapterModel = require('../models/ChapterModel');
const ImageChapterModel = require('../models/ImageChapterModel');
const Settings = require('../config/settings');

checkExistMangaByName = async name => {
  return await MangaModel.findOne({ name });
};

checkExistChapterByLink = async link => {
  return await ChapterModel.findOne({ link });
};

updateManga = async (idManga, chapter) => {
  try {
    let manga = await MangaModel.findByIdAndUpdate({ _id: idManga }, { $set: { updated: Date.now(), latestChapter: chapter } }, { new: true }, (err, doc) => {
      if (err) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.log('########## error', error);
  }
};

addListChapter = async (listChapter, idManga) => {
  let listChapterNews = [];
  let checkUpdate = false;
  for (let i = 0; i < listChapter.length; i++) {
    const chapter = listChapter[i];
    let checkExist = await checkExistChapterByLink(chapter.link);
    if (!checkExist) {
      let newChapter = new ChapterModel({
        idmanga: idManga,
        name: chapter.chapter,
        link: chapter.link,
        created: new Date()
      });
      let result = await newChapter.save();
      listChapterNews.push(result);
      if (!checkUpdate) {
        await updateManga(idManga, chapter.chapter);
        checkUpdate = true;
      }
      console.log('############ add New Chapter', result);
    }
  }
  return listChapterNews;
};

addListImage = async (listImage, idChapter) => {
  for (let i = 0; i < listImage.length; i++) {
    const image = listImage[i];
    let newImage = new ImageChapterModel({
      name: image.name,
      link: image.link,
      idchapter: idChapter
    });
    let result = newImage.save();
  }
};

addNewManga = async (manga, idCate) => {
  let newManga = new MangaModel({
    name: manga.name,
    category: manga.category,
    author: manga.author,
    description: manga.description,
    status: manga.status,
    viewers: 0,
    folowers: 0,
    rating: 0,
    thumbnail: manga.thumbnail,
    link: manga.link,
    latestChapter: idCate
  });
  let result = await newManga.save();
  return await addListChapter(manga.listChapter, result._id);
};

addNewCategory = async listCategory => {
  for (let i = 0; i < listCategory.length; i++) {
    const cate = listCategory[i];
    if (cate.name) {
      let checkExist = await CategoryModel.findOne({ name: cate.name });
      if (!checkExist) {
        let newCate = await new CategoryModel(cate);
        console.log('###### Add new category: ', cate.name);
      }
    }
  }
};

getListChapterByIdManga = async (idManga, page) => {
  return await ChapterModel.find({ idmanga: idManga })
    .sort({ _id: 1 })
    .skip((page - 1) * Settings.PAGE_LIMIT)
    .limit(Settings.PAGE_LIMIT);
};

module.exports = {
  checkExistMangaByName,
  addListChapter,
  addListImage,
  addNewManga,
  addNewCategory,
  getListChapterByIdManga,
  updateManga
};
