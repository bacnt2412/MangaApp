const Chapter = require('../models/ChapterModel.js');
module.exports = {
    getAllChapter: async (req,res,next) => {
        try {
            const data = await Chapter.find({});
            res.status(200).json({data});
        } catch (error) {
            res.status(404).json({error});
        }
    },
    addNewChapter: async (req,res,next) => {
        try {
            const chapter = new Chapter(req.body);
            const result = await chapter.save();
            res.status(200).json({result});
        } catch (error) {
            res.status(404).json({error});
        }
    },
}