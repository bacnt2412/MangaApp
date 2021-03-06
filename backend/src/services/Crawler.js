const Crawler = require('crawler');
const Category = require('../models/CategoryModel.js');
const DbService = require('../services/DbSerivce');
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

var NET_TRUYEN_Image_get_list_Crawler = new Crawler({
  maxConnections: 1,
  callback: async (error, res, done) => {
    let listImage = [];
    if (error) {
      console.log('Error NET_TRUYEN_Image_get_list_Crawler: ', error);
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
          listImage.push({ name, link });
        } catch (error) {
          console.log('######### error add image', error);
        }
      }
    }
    res.options.done(error, res, done, listImage);
  }
});

async function NET_TRUYEN_Image_get_list(url) {
  return new Promise((resolve, reject) => {
    NET_TRUYEN_Image_get_list_Crawler.queue([
      {
        uri: url,
        done: async function(err, res, done, data) {
          if (err || res.statusCode !== 200) {
            reject('err');
          }
          resolve(data);
          done();
        }
      }
    ]);
  });
}

let NET_TRUYEN_Manga_get_info_Crawler = new Crawler({
  maxConnections: 1,
  skipEventRequest: false,
  callback: async (error, res, done) => {
    let manga = null;
    if (error) {
      console.log('############### eror', error);
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
        let description = $(parent)
          .find('#item-detail > div.detail-content > p')
          .text();
        let listNodeChapter = $('#nt_listchapter > nav > ul > li');
        let laestChapter = '';
        let listChapter = [];
        for (let index = 0; index < listNodeChapter.length; index++) {
          const item = listNodeChapter[index];
          let chapter = $(item)
            .find('div.col-xs-5.chapter > a')
            .text();
          let link = $(item)
            .find('div.col-xs-5.chapter > a')
            .attr('href');
          if (chapter && link) {
            listChapter.push({ chapter, link });
            if (!laestChapter) {
              laestChapter = { chapter, link };
            }
          }
        }
        let link = res.options.uri;
        manga = {
          name,
          category,
          author,
          description,
          status,
          viewers,
          flower,
          rating,
          thumbnail,
          link,
          listChapter,
          laestChapter
        };
      } catch (error) {}
    }
    res.options.done(error, res, done, manga);
  }
});

function NET_TRUYEN_Manga_get_info(url) {
  return new Promise((resolve, reject) => {
    NET_TRUYEN_Manga_get_info_Crawler.queue([
      {
        uri: url,
        done: async function(err, res, done, data) {
          if (err || res.statusCode !== 200) {
            reject('err');
          }
          resolve(data);
          done();
        }
      }
    ]);
  });
}

var NET_TRUYEN_Manga_get_list_Crawler = new Crawler({
  maxConnections: 1,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    let listManga = [];
    if (error) {
      console.log(error);
    } else {
      if (res.statusCode != 200) {
        console.log('Failse Load Page');
      } else {
        try {
          let $ = res.$;
          let allMangaOfPage = await getAllNodeManga($);

          for (let index = 0; index < allMangaOfPage.length; index++) {
            const item = allMangaOfPage[index];
            let manga = await getInfoNodeManga($(item));
            listManga.push(manga);
          }
        } catch (error) {}
      }
    }
    res.options.done(error, res, done, listManga);
  }
});

function NET_TRUYEN_Manga_get_list(urls) {
  return new Promise((resolve, reject) => {
    const loop = urls.map(url => {
      return new Promise((resolve, reject) => {
        NET_TRUYEN_Manga_get_list_Crawler.queue([
          {
            uri: url,
            /* userAgent: userAgent,
          referer: referer, */
            done: async function(err, res, done, listManga) {
              if (err || res.statusCode !== 200) {
                reject('err');
              }
              resolve(listManga);
              done();
            }
          }
        ]);
      });
    });
    NET_TRUYEN_Manga_get_list_Crawler.once('error', error => reject(error));
    NET_TRUYEN_Manga_get_list_Crawler.once('drain', () => {
      Promise.all(loop).then(results => {
        resolve(results);
      });
    });
  });
}

var NET_TRUYEN_Category_get_list_Crawler = new Crawler({
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
        listCate.push({ name, link });
        let checkExist = await Category.findOne({ link });
        if (checkExist === null) {
          let newCate = new Category({ name, link });
          let result = await newCate.save();
          console.log('Add success Category: ', newCate.name);
        }
      }
    }
    res.options.done(error, res, done, listCate);
  }
});

function NET_TRUYEN_Category_get_list(url) {
  return new Promise((resolve, reject) => {
    NET_TRUYEN_Category_get_list_Crawler.queue([
      {
        uri: url,
        /* userAgent: userAgent,
					referer: referer, */
        done: async function(err, res, done, listCate) {
          if (err || res.statusCode !== 200) {
            reject('err');
          }
          resolve(listCate);
          done();
        }
      }
    ]);
  });
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function startGetAllCategory() {
  try {
    let listCate = await NET_TRUYEN_Category_get_list('http://www.nettruyen.com/tim-truyen');
    DbService.addNewCategory(listCate);
  } catch (error) {}
}
async function startCrawNewData() {
  console.log('============================================================= Start =============================================================');
  try {
    let list = await NET_TRUYEN_Manga_get_list([
      'http://www.nettruyen.com/',
      'http://www.nettruyen.com/?page=2',
      // 'http://www.nettruyen.com/?page=3',
      // 'http://www.nettruyen.com/?page=4',
      // 'http://www.nettruyen.com/?page=5',
      // 'http://www.nettruyen.com/?page=6',
      // 'http://www.nettruyen.com/?page=7',
      // 'http://www.nettruyen.com/?page=8',
      // 'http://www.nettruyen.com/?page=9',
      // 'http://www.nettruyen.com/?page=10',
      // 'http://www.nettruyen.com/?page=11',
      // 'http://www.nettruyen.com/?page=12',
      // 'http://www.nettruyen.com/?page=13',
      // 'http://www.nettruyen.com/?page=14',
      // 'http://www.nettruyen.com/?page=15',
      // 'http://www.nettruyen.com/?page=16',
      // 'http://www.nettruyen.com/?page=17',
      // 'http://www.nettruyen.com/?page=18',
      // 'http://www.nettruyen.com/?page=19',
      // 'http://www.nettruyen.com/?page=20',
      // 'http://www.nettruyen.com/?page=21',
      // 'http://www.nettruyen.com/?page=22',
      // 'http://www.nettruyen.com/?page=23',
      // 'http://www.nettruyen.com/?page=24',
      // 'http://www.nettruyen.com/?page=25'
    ]);
    let listManga = [];
    list.map(item => {
      item.map(items => {
        listManga.push(items);
      });
    });
    for (let i = 0; i < listManga.length; i++) {
      const manga = listManga[i];

      const detailMangaOnSite = await NET_TRUYEN_Manga_get_info(manga.link);
      await sleep(3000);
      //Check Exist Manga
      let result = await DbService.checkExistMangaByName(manga.name);

      let listChapterNew = [];
      //Existed
      if (result) {
        let listChapter = detailMangaOnSite.listChapter;
        listChapterNew = await DbService.addListChapter(listChapter, result._id);
      } else {
        console.log('################# Add New Manga', detailMangaOnSite);
        listChapterNew = await DbService.addNewManga(detailMangaOnSite);
        //Not Exist
      }
      console.log('################# list Chapter New ', listChapterNew);
      if (listChapterNew && listChapterNew.length > 0) {
        for (let i = 0; i < listChapterNew.length; i++) {
          const chapterNew = listChapterNew[i];
          let listImage = await NET_TRUYEN_Image_get_list(chapterNew.link);
          await DbService.addListImage(listImage, chapterNew._id);
          await sleep(3000);
        }
      }

      await sleep(5000);
    }
  } catch (error) {
    console.log('####################### Error: ', error);
  }
  console.log('======================================= End ' + new Date().getHours() + ' ====================================');
}

start = async () => {
  try {
    console.log('********************** Start Crawler Data ************************');
    startGetAllCategory();
    setTimeout(async () => {
      while (true) {
        await startCrawNewData();
        //sleep 3h.
        await sleep(3600 * 1000 * 2);
      }
    }, 1000);
  } catch (error) {
    console.log('############################ ERROR: ', error);
  }
};

const CrawlerData = {
  start,
  NET_TRUYEN_Image_get_list
};

module.exports = CrawlerData;
