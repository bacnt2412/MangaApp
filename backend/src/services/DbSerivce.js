const CategoryModel = require('../models/CategoryModel');
const MangaModel = require('../models/MangaModel');
const ChapterModel = require('../models/ChapterModel');
const ImageChapterModel = require('../models/ImageChapterModel');

checkExistMangaByName = async name => {
  return await MangaModel.findOne({ name });
};

checkExistChapterByLink = async link => {
  return await ChapterModel.findOne({ link });
};

updateManga = async idManga => {
  try {
    let manga = await ChapterModel.find({ _id: idManga });
    manga.updated = Date.now;
  } catch (error) {}
};

addListChapter = async (listChapter, idManga) => {
  let listChapterNews = [];
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
      await updateManga(idManga);
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



module.exports = {
  checkExistMangaByName,
  addListChapter,
  addListImage,
  addNewManga,
  addNewCategory
};
