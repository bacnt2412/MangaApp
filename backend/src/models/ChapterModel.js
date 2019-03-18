const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chapter = new Schema({
    idmanga: {
        type: String,
        required: [true, "IdManga is Required"]
    },
    name:{
        type: String,
        required: [true, "Name Chapter is Required"]
    },
    link:{
        type: String,
        required: [true,"Link Chaprer is Required"]
    },
    created: {
        type: Date
    },
    viewers: {
        type: Number
    }
});
const Chapter = mongoose.model('chapter',chapter);
module.exports = Chapter;