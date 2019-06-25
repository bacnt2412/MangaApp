import { PermissionsAndroid } from 'react-native';
const moment = require('moment');
const timezone = require('moment-timezone');
import Lang from '../Language';

// Locate moment
if (Lang.lang === 'jp') {
  require('moment/locale/ja');
  moment.locale('ja');
}

export default class Utils {
  static userData = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhY250IiwiX2lkIjoiNWQwYjk1NDk0NzEwMDU3M2I0YmYzY2JmIiwiaWF0IjoxNTYxMzg0NzI3LCJleHAiOjE1NjE2NDM5Mjd9.1ewkmQS4wWSAb5-Z-v8ScG3oZK95cxwmclg9dYk7OGQ',
    name: 'Tuan Bac',
    avatar: '',
    provider: 'system',
    listIdMangaFollow: [
      '5d046a879627483f328e9209',
      '5d0461369627483f328ccbd5',
      '5d0462ae9627483f328d2755'
    ],
    listAppId: '',
    _id: '5d0b954947100573b4bf3cbf',
    username: 'bacnt',
    email: 'bacnt',
    created: '2019-06-20T14:16:41.587Z',
    hash_password:
      '$2b$10$3sLVgQmIMxcrotemBieBWerI71/u4oj9h5zJJlT.HQTmWIKdF/IDO'
  };

  static Permission = {
    request_WRITE_EXTERNAL_STORAGE_Permission: async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    },
    request_READ_EXTERNAL_STORAGE_Permission: async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  static Thread = {
    sleep: timeout => {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve();
          }, timeout);
        } catch (error) {
          reject(error);
        }
      });
    }
  };

  static Time = {
    formatFromString(str) {
      // Get time with GMT timezone
      var momentObjGMT = timezone.tz(str, 'YYYY-MM-DD HH:mm:ss', 'GMT');

      // Convert time to Bangkok timezone
      momentObjGMT = momentObjGMT.tz('Asia/Bangkok');

      // Gen to string from now
      var str = momentObjGMT.fromNow();
      return str;
    },

    convertToMilliseconds(str, format = 'YYYY-MM-DD HH:mm:ss') {
      var momentObjGMT = timezone.tz(str, format, 'GMT');
      return momentObjGMT.valueOf();
    },

    formatFromMilliseconds(milliseconds) {
      var format = 'YYYY-MM-DD HH:mm:ss';
      var time = moment.unix(milliseconds).format(format);
      return moment(time, format).fromNow();
    },

    getTimeNowFromMilliseconds(milliseconds) {
      var format = 'YYYY-MM-DD HH:mm:ss';
      var time = moment.unix(milliseconds).format(format);
      return moment(time, format).format('YYYY-MM-DD HH:mm:ss');
    },

    getTimeNow() {
      var format = 'YYYY-MM-DD HH:mm:ss';
      var newYork = moment.tz(Date.now(), 'GMT');
      return newYork.format(format);
    },

    genVideoTime(totalSeconds) {
      var timeStr = '00:00';
      var second = totalSeconds % 60;
      var min = Math.floor(totalSeconds / 60);
      if (second < 10) second = '0' + second;
      if (min < 10) min = '0' + min;
      timeStr = min + ':' + second;
      return timeStr;
    }
  };

  static String = {
    getFromBetween: (source, sub1, sub2) => {
      if (source.indexOf(sub1) < 0 || source.indexOf(sub2) < 0) return false;
      var SP = source.indexOf(sub1) + sub1.length;
      var string1 = source.substr(0, SP);
      var string2 = source.substr(SP);
      var TP = string1.length + string2.indexOf(sub2);
      return source.substring(SP, TP);
    }
  };

  static Number = {
    random: () => {
      return Math.random(0, 1000000);
    }
  };
}
