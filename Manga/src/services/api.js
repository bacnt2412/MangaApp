import axios from 'axios';
import { Platform } from 'react-native';
import Settings from '../config/settings';
import Utils from '../utils/utils.js';

export default class Api {
  static post = async (url, data, exConfig) => {
    var config = {
      headers: {
        Authorization: 'Bearer ' + (Utils.userData && Utils.userData.token)
      }
    };
    if (!exConfig) exConfig = { timeout: 10000 };
    var newConfig = { ...config, ...exConfig };
    var res = {};
    try {
      console.log('Request POST: ', url, data, newConfig);
      res = await axios.post(url, data, newConfig);
    } catch (err) {
      res.error = err;
    }
    console.log('Response data', res);
    let type = typeof res.data;
    if (type === 'string') {
      console.log('## Response Error');
      let data = res.data + `"}]}`;
      data = JSON.parse(data);
      res.data = data;
    }

    // Check status token expired
    if (res && res.data && res.data.status === 440) {
      // Reupdate status
      res.status = 440;
    }

    // Check network error
    //!res  || !res.data || !res.data.status ||
    else if (
      res &&
      !res.status &&
      !(res.data && res.data.status) &&
      !(
        res.error &&
        res.error.response &&
        (res.error.response.status || res.error.response.data.status)
      )
    ) {
      res = {
        status: 1000,
        message: 'Netword Error.!'
      };
    }
    return res;
  };

  static get = async (url, data, exConfig) => {
    var config = {
      params: data,
      headers: {
        Authorization: 'Bearer ' + (Utils.userData && Utils.userData.token)
      }
    };
    if (!exConfig) exConfig = { timeout: 10000 };
    var newConfig = { ...config, ...exConfig };
    var res = {};
    try {
      console.log('Request GET: ', url, data, newConfig);
      res = await axios.get(url, newConfig);
    } catch (err) {
      res = err;
    }
    console.log('Response data', res);

    // Check network error
    if (
      res &&
      !res.status &&
      !(res.data && res.data.status) &&
      !(res.error && res.error.response && res.error.response.data.status)
    ) {
      res = {
        status: 1000,
        message: 'Netword Error.!'
      };
    }
    return res;
  };

  static getLatestManga = async data => {
    let url = Settings.SERVER_API + 'manga/get-latest-manga';
    return await this.post(url, data);
  };

  static getMostFavoriteManga = async data => {
    let url = Settings.SERVER_API + 'manga/get-most-favorite-manga';
    return await this.post(url, data);
  };

  static getMostViewManga = async data => {
    let url = Settings.SERVER_API + 'manga/get-most-view-manga';
    return await this.post(url, data);
  };

  static getListChapterByIdManga = async data => {
    let url = Settings.SERVER_API + 'chapter/get-chapter-by-id-manga';
    return await this.post(url, data);
  };

  static getListImageByIdChapter = async data => {
    let url = Settings.SERVER_API + 'image/get-image-by-id-chapter';
    return await this.post(url, data);
  };

  static updateViewManga = async data => {
    let url = Settings.SERVER_API + 'manga/update-view-manga';
    return await this.post(url, data);
  };

  static getListCategory = async () => {
    let url = Settings.SERVER_API + 'category/get-all-category';
    return await this.get(url);
  };

  static getListMangaByIdCategory = async data => {
    let url = Settings.SERVER_API + 'manga/get-manga-by-id-category';
    return await this.post(url, data);
  };

  static getHistoryManga = async (data) => {
    let url = Settings.SERVER_API + 'manga/get-history-manga';
    return await this.post(url, data);
  };

  static getFollowManga = async (data) => {
    let url = Settings.SERVER_API + 'manga/get-follow-manga';
    return await this.post(url, data);
  };

  static followManga = async (data) => {
    let url = Settings.SERVER_API + 'manga/follow-manga';
    return await this.post(url, data);
  };

  static unfollowManga = async (data) => {
    let url = Settings.SERVER_API + 'manga/unfollow-manga';
    return await this.post(url, data);
  };

  static getMangaById = async (data) => {
    let url = Settings.SERVER_API + 'manga/get-manga-by-id';
    return await this.post(url, data,{ timeout: 60000 });
  };

  static getAllImageByIdChapter = async (data) => {
    let url = Settings.SERVER_API + 'image/get-all-image-by-id-chapter';
    return await this.post(url, data);
  };

  static getTotalImageOfChapter = async (data) => {
    let url = Settings.SERVER_API + 'manga/get-total-image-by-id-chapter';
    return await this.post(url, data,{ timeout: 30000 });
  };

  static searchMangaByName = async (data) => {
    let url = Settings.SERVER_API + 'manga/search-by-name';
    return await this.post(url, data,{ timeout: 30000 });
  };

}