const Image = require('../models/ImageChapterModel.js');
const settings = require('../config/settings.js');

module.exports = {
    getImageByIdChapter: async (req,res) => {
        try {
            let filter = {
                idChapter: req.body.idChapter
            };
            const lastIdImage = req.body.lastIdImage;
            if (lastIdImage) {
              filter = {
                idchapter: req.body.idChapter,
                _id: { $gt: lastIdImage }
              };
            }
            const listImage = await Image.find(filter).limit(settings.PAGE_LIMIT);
            res.status(200).json({ listImage });
          } catch (error) {
            console.log('#################', req.body);
            res.status(400).json({ error });
          }
    }
}