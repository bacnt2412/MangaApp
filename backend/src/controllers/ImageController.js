const Image = require('../models/ImageChapterModel.js');
const settings = require('../config/settings.js');

module.exports = {
  getAllImage: async (req,res) => {
    try {
      const listImage = await Image.find({});
      res.status(200).json({ data: listImage});
    } catch (error) {
      res.status(400).json({ error });
    }
  },getImageByIdChapter: async (req,res) => {
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
            const listImage = await Image.find(filter).limit(settings.PAGE_LIMIT);
            res.status(200).json({ data: listImage });
          } catch (error) {
            console.log('################# Data: ', req.body);
            console.log('################# Error: ', error);
            res.status(400).json({ error });
          }
    }
}