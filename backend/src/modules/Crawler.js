const Crawler = require('crawler');
const Category = require('../models/CategoryModel.js');
const Manga = require('../models/MangaModel.js');
const Chapter = require('../models/ChapterModel');
const ImageChapter = require('../models/ImageChapterModel.js');
var Proxy = '';

getAllNodeManga = $ => {
  return $('.items').find('.item');
};
getInfoNodeManga = $ => {
  try {
    let name = $.find('figure > figcaption > h3 > a').text();
    let link = $.find('figure > figcaption > h3 > a').prop('href');
    return {
      name,
      link
    };
  } catch (error) {
    console.log('################ getInfoNodeManga Error', error);
  }
};

let crawlerDetailChapter = new Crawler({
  maxConnections: 1,
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

var crawlerListChapterFromManga = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    if (error) {
      getRandomProxy();
      crawlerListChapterFromManga.queue(res.options.uri);
      console.log(error);
    } else {
      let $ = res.$;
      let listNodeChapter = $('#nt_listchapter > nav > ul > li');
      for (let index = listNodeChapter.length - 1; index >= 0; index--) {
        const item = listNodeChapter[index];
        let name = $(item)
          .find('div.col-xs-5.chapter > a')
          .text();

        let link = $(item)
          .find('div.col-xs-5.chapter > a')
          .attr('href');
        let created = new Date();
        let viewers = $(item)
          .find('div.col-xs-3.text-center.small')
          .text();
        let idmanga = res.options.idmanga;

        if (name && link) {
          try {
            let checkExist = await Chapter.findOne({ link });
            if (checkExist === null) {
              let newChapter = new Chapter({
                idmanga,
                name,
                link,
                created,
                viewers
              });
              let result = await newChapter.save();
              console.log('##################### add success chapter', name);
              crawlerAllImageFromChapter.queue({ uri: link, idchapter: result._id });
            } else {
              crawlerAllImageFromChapter.queue({ uri: link, idchapter: checkExist._id });
            }
          } catch (error) {
            console.log('##################### error', error);
          }
        }
      }
    }
    done();
  }
});

let crawlerDetailInfoManga = new Crawler({
  maxConnections: 1,
  skipEventRequest: false,
  callback: async (error, res, done) => {
    if (error) {
      getRandomProxy();
      crawlerDetailInfoManga.queue(res.options.uri);
      console.log(error);
    } else {
      try {
        let $ = res.$;
        let parent = $('#item-detail');
        let name = $(parent)
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
        let latestChapter = '';
        for (let index = 0; index < listNodeChapter.length; index++) {
          const item = listNodeChapter[index];
          let chapter = $(item)
            .find('div.col-xs-5.chapter > a')
            .text();
          let link = $(item)
            .find('div.col-xs-5.chapter > a')
            .attr('href');
          if (chapter && link) {
            if (!latestChapter) {
              latestChapter = chapter;
              break;
            }
          }
        }
        try {
          let link = res.options.uri;
          if (name && name.trim() != '') {
            let existManga = await Manga.findOne({ link });
            if (existManga === null) {
              if (name && link) {
                let newManga = await new Manga({
                  name,
                  category,
                  author,
                  status,
                  viewers,
                  flower,
                  rating,
                  thumbnail,
                  link,
                  latestChapter
                });
                const result = await newManga.save();
                console.log('################### result Add new manga', result.name);
                crawlerListChapterFromManga.queue({ uri: link, idmanga: result._id });
              }
            } else {
              crawlerListChapterFromManga.queue({ uri: link, idmanga: existManga._id });
            }
          }
        } catch (error) {}
      } catch (error) {}
    }
    done();
  }
});

var crawlerMangaFromCategory = new Crawler({
  maxConnections: 1,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      getRandomProxy();
      crawlerMangaFromCategory.queue(res.options.uri);
      console.log(error);
    } else {
      if (res.statusCode != 200) {
        console.log('Failse Load Page');
        console.log('Change proxy...');
        crawlerMangaFromCategory.queue({ uri: res.options.uri, proxy: Proxy });
      } else {
        try {
          console.log('#######################', res.$);
          let $ = res.$;
          let allMangaOfPage = await getAllNodeManga($);
          for (let index = 0; index < allMangaOfPage.length; index++) {
            const item = allMangaOfPage[index];
            let manga = await getInfoNodeManga($(item));
            let existManga = await Manga.findOne({ link: manga.link });
            console.log('########################## Manga', manga);
            if (existManga === null) {
              crawlerDetailInfoManga.queue({
                uri: manga.link
              });
            } else {
              crawlerListChapterFromManga.queue({ uri: manga.link, idmanga: existManga._id });
            }
          }
        } catch (error) {}
      }
    }
    done();
  }
});


var crawlerTotalPage = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let totalPage = $('#ctl00_mainContent_ctl01_divPager > ul > li.hidden').text();
      //Trang 1 / 423
      totalPage = totalPage.replace('Trang 1 /', '').trim();
      for (let index = 0; index < totalPage; index++) {
        crawlerMangaFromCategory.queue('http://www.nettruyen.com/tim-truyen?page=' + index);
      }
    }
    done();
  }
});

var crawlerAllImageFromChapter = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    if (error) {
      getRandomProxy();
      crawlerAllImageFromChapter.queue(res.options.uri);
      console.log(error);
    } else {
      let $ = res.$;
      let allNodeimage = $('#ctl00_divCenter > div > div.reading-detail.box_doc > div.page-chapter');
      for (let index = 0; index < allNodeimage.length; index++) {
        try {
          const item = allNodeimage[index];
          let name = $(item).attr('id');
          let link = $(item)
            .find('img')
            .attr('src');
          let idchapter = res.options.idchapter;
          let checkExist = await ImageChapter.findOne({ link }).then(data => {
            return data == null;
          });
          if (checkExist) {
            if (name && link && idchapter) {
              let newImage = await new ImageChapter({
                name,
                link,
                idchapter
              });
              let result = await newImage.save();
              console.log('image', name);
            }
          }
        } catch (error) {
          console.log('######### error add image', error);
        }
      }
    }
    done();
  }
});

alwayCrawlerData = () => {
  console.log('Start crawler data');
  for (let index = 1; index <= 5; index++) {
    crawlerMangaFromCategory.queue('http://www.nettruyen.com/tim-truyen?page=' + index);
  }
  setInterval(() => {
    console.log('Start again crawler data');
    getRandomProxy();

    for (let index = 1; index <= 5; index++) {
      crawlerMangaFromCategory.queue('http://www.nettruyen.com/tim-truyen?page=' + index);
    }
  }, 30 * 60 * 1000);
};

var getListProxy = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let listNodeProxy = $('#proxylisttable > tbody > tr');
      let listProxy = [];
      //Trang 1 / 423
      for (let index = 0; index < listNodeProxy.length; index++) {
        if (index > 10) {
          break;
        }
        let item = listNodeProxy[index];

        listProxy.push('http://' + $(item).find('td')[0].children[0].data + ':' + $(item).find('td')[1].children[0].data);
      }
      console.log('################ listProxy', listProxy);

      Proxy = listProxy[Math.floor(Math.random() * (listProxy.length - 0)) + 0];
      console.log('################ Proxy', Proxy);
    }
    done();
  }
});

getRandomProxy = async () => {
  await getListProxy.queue({
    uri: 'https://free-proxy-list.net/'
  });

  await getListProxy.on('drain', function() {
    console.log('crawling is done');
    return true;
  });
};


var crawlerListMangaByCategory = new Crawler({
  maxConnections: 1,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let listManga = [];
      if (res.statusCode != 200) {
        console.log('Failse Load Page');
      } else {
        try {
          let $ = res.$;
          let allMangaOfPage = await getAllNodeManga($);

          for (let index = 0; index < allMangaOfPage.length; index++) {
            const item = allMangaOfPage[index];
            let manga = await getInfoNodeManga($(item));
            listManga
          }
        } catch (error) {}
      }
    }
    done();
  }
});

function getListMangaByCategory_NET_TRUYEN(urls) {
  return new Promise((resolve, reject) => {
    const loop = urls.map(url => {
      return new Promise((resolve, reject) => {
        NET_TRUYEN_get_all_category.queue([
          {
            uri: url,
            /* userAgent: userAgent,
					referer: referer, */
            done: async function(err, res, done,listCate) {
              if (err || res.statusCode !== 200) {
                reject('err');
                throw new Error(err);
              }
              const $ = res.$;
              resolve(listCate);
              done();
            }
          }
        ]);
      });
    });
    NET_TRUYEN_get_all_category.once('error', error => reject(error));
    NET_TRUYEN_get_all_category.once('drain', () => {
      Promise.all(loop).then(results => {
        resolve(results);
      });
    });
  });
}

function getAllCategory_NET_TRUYEN(urls) {
  return new Promise((resolve, reject) => {
    const loop = urls.map(url => {
      return new Promise((resolve, reject) => {
        NET_TRUYEN_get_all_category.queue([
          {
            uri: url,
            /* userAgent: userAgent,
					referer: referer, */
            done: async function(err, res, done,listCate) {
              if (err || res.statusCode !== 200) {
                reject('err');
                throw new Error(err);
              }
              const $ = res.$;
              resolve(listCate);
              done();
            }
          }
        ]);
      });
    });
    NET_TRUYEN_get_all_category.once('error', error => reject(error));
    NET_TRUYEN_get_all_category.once('drain', () => {
      Promise.all(loop).then(results => {
        resolve(results);
      });
    });
  });
}

var NET_TRUYEN_get_all_category = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    let listCate = [];
    if (error) {
      console.log(error);
    } else {
      let $ = res.$;
      let listNodeCategory = $('#ctl00_divRight > div.box.darkBox.genres.hidden-sm.hidden-xs.Module.Module-179 > div > ul > li');
      for (let index = 0; index < listNodeCategory.length; index++) {
        const item = listNodeCategory[index];
        let name = $(item)
          .find('a')
          .text();
        let link = $(item)
          .find('a')
          .attr('href');
        listCate.push(name);
        let checkExist = await Category.findOne({ link });
        if (checkExist === null) {
          let newCate = new Category({ name, link });
          let result = await newCate.save();
          console.log('Add success Category: ', newCate.name);
        }
      }
    }
    res.options.done(error, res, done,listCate);
  }
});


start = async () => {
  try {
    // Lấy tất cả danh mục của net truyện
    let res = await getAllCategory_NET_TRUYEN(['http://www.nettruyen.com/tim-truyen']);
    console.log(' Get ALl Danh Muc Net Truyen res: ', res);

    // Lần đầu chạy Server Lấy truyện của 10 trang đầu tiên.

    // crawlerMangaFromCategory.on('schedule', function(options) {
    //   options.proxy = Proxy;
    // });
    // crawlerListChapterFromManga.on('schedule', function(options) {
    //   options.proxy = Proxy;
    // });
    // crawlerDetailInfoManga.on('schedule', function(options) {
    //   options.proxy = Proxy;
    // });

    // crawlerAllCategory.on('schedule', function(options) {
    //   options.proxy = Proxy;
    // });
    // crawlerAllImageFromChapter.on('schedule', function(options) {
    //   options.proxy = Proxy;
    // });

  

    //Lần đầu crawler
    // NET_TRUYEN_get_all_category.queue([
    //   {
    //     uri: 'http://www.nettruyen.com/tim-truyen',
    //   }
    // ]);
    // NET_TRUYEN_get_all_category.on('drain',()=> {
    //   console.log('###### done')
    // })
  } catch (error) {
    console.log('############################ ERROR: ', error);
  }
};

const CrawlerData = {
  start
};

module.exports = CrawlerData;
