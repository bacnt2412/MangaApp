import en from './english';
import vn from './vietnamese';

export default class Lang {
  static myInstance = null;

  static languages = {
    en: 'en',
    vn: 'vn'
  };

  static getLanguage() {
    return this.lang;
  }

  static setLanguage = lang => {
    this.lang = lang;
  };

  static getByKey = key => {
    key = key.toLowerCase();
    if (this.lang === this.languages.en) {
      return en[key] !== null ? en[key] : '[' + this.lang + '_' + key + ']';
    } else if (this.lang === this.languages.vn) {
      return vn[key] != null ? vn[key] : '[' + this.lang + '_' + key + ']';
    }
    return '[' + this.lang + '_' + key + ']';
  };
}
