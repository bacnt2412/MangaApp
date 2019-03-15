const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const settings = require('./src/config/settings.js');
mongoose.connect(
    'mongodb+srv://admin:'+ 
    settings.mongoDB_Password +
    '@nodejs-gypfg.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true,
    }
);

const app = express();
const CategoryRoute = require('./src/routes/CategoryRoute.js');
const Mangaroute = require('./src/routes/MangaRoute.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


app.use('/api/Category',CategoryRoute);
app.use('/api/Manga',Mangaroute);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found!'
  });
});
module.exports = app;