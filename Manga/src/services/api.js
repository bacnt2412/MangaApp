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
    let url = Settings.SERVER_API + 'api/manga/get-latest-manga';
    return await this.post(url, data);
  };

  static getMostFavoriteManga = async data => {
    let url = Settings.SERVER_API + 'api/manga/get-most-favorite-manga';
    return await this.post(url, data);
  };

  static getMostViewManga = async data => {
    let url = Settings.SERVER_API + 'api/manga/get-most-view-manga';
    return await this.post(url, data);
  };
}
