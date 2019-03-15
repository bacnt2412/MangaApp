const Crawler = require('crawler');

getAllNodeManga = $ => {
  return $('.items').find('.item');
};
getInfoNodeManga = $ => {
  let name = $.find('figure > figcaption > h3 > a').text();
  let link = $.find('figure > figcaption > h3 > a').prop('href');
  return {
    name,
    link
  };
};

let crawlerDetailChapter = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let parent = $('#ctl00_divCenter > div > div.reading-detail.box_doc');
      let allNodeImage = $(parent).find('.page-chapter');
      console.log('==================', allNodeImage.length);
      allNodeImage.map((index, item) => {
        let image = $(item)
          .find('img')
          .attr('src');
        console.log('==================', image);
      });
    }
    done();
  }
});

let crawlerDetailInfoManga = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let parent = $('#item-detail');
      let title = $(parent)
        .find('h1')
        .text();
      let author = $(parent)
        .find('div.col-xs-8.col-info > ul > li.author.row > p.col-xs-8')
        .text();
      let status = $(parent)
        .find('#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.status.row > p.col-xs-8')
        .text();
      let category = $(parent)
        .find('#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.kind.row > p.col-xs-8')
        .text();
      let viewers = $(parent)
        .find('#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li:nth-child(4) > p.col-xs-8')
        .text();
      let rating = $(parent)
        .find('#item-detail > div.detail-info > div > div.col-xs-8.col-info > div.row.rating > div:nth-child(1) > div')
        .attr('data-rating');
      let flower = $(parent)
        .find('#item-detail > div.detail-info > div > div.col-xs-8.col-info > div.follow > span > b')
        .text();
      let thumbnail = $(parent)
        .find('.col-xs-4.col-image')
        .find('img')
        .attr('src');

      let listNodeChapter = $('#nt_listchapter > nav > ul > li');
      let listChapter = [];
      let latestChapter = null;

      console.log('==============================================================================', listNodeChapter.length);

      listNodeChapter.map((index, item) => {
        let chapter = $(item)
          .find('div.col-xs-5.chapter > a')
          .text();
        let link = $(item)
          .find('div.col-xs-5.chapter > a')
          .attr('href');
        if (chapter && link) {
          if (!latestChapter) {
            latestChapter = { chapter, link };
          }
          listChapter.push({
            chapter,
            link
          });
        }
      });
      console.log('#### title', title);
      console.log('#### author', author);
      console.log('#### status', status);
      console.log('#### category', category);
      console.log('#### viewers', viewers);
      console.log('#### rating', rating);
      console.log('#### flower', flower);
      console.log('#### thumbnail', thumbnail);
      console.log('#### latest chapter', latestChapter);
      latestChapter && latestChapter.link ? crawlerDetailChapter.queue(latestChapter.link) : undefined;
      //console.log('#### listChapter', listChapter);
    }
    done();
  }
});

var crawlerMangaFromCategory = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let allMangaOfPage = await getAllNodeManga($);
      allMangaOfPage.map(async (index, item) => {
        let category = await getInfoNodeManga($(item));
        await crawlerDetailInfoManga.queue({
          uri: category.link,
          category
        });
      });
    }
    done();
  }
});

const CrawlerData = {
  startCrawlerMangaFromCategory: linkCategory => {
    crawlerMangaFromCategory.queue(linkCategory);
  }
};

module.exports = CrawlerData;
