const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const settings = require('./src/config/settings.js');
const CrawlerData = require('./src/modules/Crawler.js');
const ImageRoute = require('./src/routes/ImageRoute.js');

var mongoOptions = { keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 2000,useNewUrlParser: true }

mongoose
  .connect('mongodb://127.0.0.1:27017/Manga', mongoOptions)
  .then(() => {
    console.log('Mongo connected');
    CrawlerData.start();
  });

const app = express();
// INIT ROUTER
const CategoryRoute = require('./src/routes/CategoryRoute.js');
const Mangaroute = require('./src/routes/MangaRoute.js');
const ChapterRoute = require('./src/routes/ChapterRoute.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// SET ROUTER
app.use('/api/category', CategoryRoute);
app.use('/api/manga', Mangaroute);
app.use('/api/chapter', ChapterRoute);
app.use('/api/image', ImageRoute);


app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found!'
  });
});

module.exports = app;
