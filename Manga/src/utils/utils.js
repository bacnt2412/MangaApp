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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhY250IiwiX2lkIjoiNWQwYjk2ODgwNTQxY2UwOGMxZjIzNjU1IiwiaWF0IjoxNTYxMDQzNDIyLCJleHAiOjE1NjEzMDI2MjJ9.yidZVpM6ERA1WB_PhVve16covLNzay_bpB_mg-NOjQM'
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
}
