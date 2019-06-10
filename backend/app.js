var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var settings = require('./src/config/settings.js');
var CrawlerData = require('./src/services/Crawler.js');
var ImageRoute = require('./src/routes/ImageRoute.js');
var middleware = require('./middleware.js');
mongoose.Promise = global.Promise;

var mongoOptions = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  reconnectTries: 30,
  reconnectInterval: 2000,
  useNewUrlParser: true
};

mongoose.connect(settings.MONGODB_CONNECTION_STRING, mongoOptions);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Mongo connected');
  //CrawlerData.start();
});

const app = express();
// INIT ROUTER
const CategoryRoute = require('./src/routes/CategoryRoute.js');
const Mangaroute = require('./src/routes/MangaRoute.js');
const ChapterRoute = require('./src/routes/ChapterRoute.js');
const UserRoute = require('./src/routes/UserRoute.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// SET ROUTER
app.use('/', UserRoute);
app.use('/api', middleware.checkToken);
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
