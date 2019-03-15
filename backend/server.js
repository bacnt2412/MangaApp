const http = require('http');
const app = require('./app.js');
const port = process.env.PORT || 3000;
const CrawlerData = require('./src/modules/Crawler.js');
const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
CrawlerData.startCrawlerMangaFromCategory('http://www.nettruyen.com/tim-truyen/action');