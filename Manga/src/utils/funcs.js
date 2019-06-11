import { Dimensions, Platform } from 'react-native';

export default class Funcs {
  static isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896))
    );
  }

  static delay(func, time) {
    TimerMixin.setTimeout(() => func(), time);
  }
}
