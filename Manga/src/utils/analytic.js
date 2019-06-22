import { Analytics, Hits } from 'react-native-google-analytics';
import DeviceInfo from 'react-native-device-info';
import Const from './const';

// More doc https://github.com/react-native-community/react-native-google-analytics
export default class Analytic {
  static ga = null;

  static getInstance() {
    if (!Analytics.ga) {
      let clientId = DeviceInfo.getUniqueID();
      Analytic.ga = new Analytics(
        'UA-142214435-1',
        clientId,
        1,
        DeviceInfo.getUserAgent()
      );
    }
    return Analytic.ga;
  }

  static sendScreen(screenName) {
    console.log(' ### Analytic screenView', screenName);

    let screenView = new Hits.ScreenView(
      Const.APP.NAME,
      screenName,
      DeviceInfo.getReadableVersion(),
      DeviceInfo.getBundleId()
    );

    Analytic.getInstance().send(screenView);
  }

  static sendEvent(category, action, label, value) {
    label = label ? label : action;
    value = value ? value : action;
    console.log(' ### Analytic event', category, action, label, value);
    let gaEvent = new Hits.Event(category, action, label, value, null);
    Analytic.getInstance().send(gaEvent);
  }
}