
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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhY250IiwiaWF0IjoxNTYwNTI0NDY4LCJleHAiOjE1NjMxMTY0Njh9.Px_LPuFImfQ3ny44byPHimBhGL7vWTgSACEDeYNntCc'
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
}
